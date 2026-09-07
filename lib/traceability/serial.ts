// ETIA 序列号 —— 生成、校验、签名。
//
// 背景：灯泡包装盒上只有型号(Part Number)和手写批次(Lot Number)，没有唯一
// 序列号，也没有任何条码。要做到「每一支」的追溯，唯一可行的路径是 ETIA
// 入库时自己发号、自己贴二维码标签。设备(如 S2000-XLA)原厂已有序列号和
// DataMatrix，但仍统一发一个 ETIA 号，好让两类物品在系统里同构。
//
// 详见 docs/ops-system/TRACEABILITY.md §2.5。
//
// 这个模块被两端共用：
//   · 国内(腾讯云)内部系统 —— 入库时生成序列号、打印标签
//   · 境外(Vercel)公开验证页 —— 校验扫进来的序列号与签名
// 所以它不依赖任何运行时环境，只用 node:crypto。

import { createHmac, timingSafeEqual } from "node:crypto";

// ---------------------------------------------------------------------------
// 字符集
// ---------------------------------------------------------------------------

// Crockford Base32：刻意去掉 I、L、O、U。
// 前三个是为了避免 0/O、1/I/L 认错 —— 序列号会被人念在电话里、抄在纸上、
// 手工敲进搜索框，这类错误在仓库里天天发生。U 是 Crockford 为了避免拼出
// 冒犯性词汇而去掉的，一并沿用，这样我们和标准完全一致。
const ALPHABET = "0123456789ABCDEFGHJKMNPQRSTVWXYZ";
const RADIX = ALPHABET.length; // 32

const VALUE = new Map<string, number>();
for (let i = 0; i < ALPHABET.length; i++) VALUE.set(ALPHABET[i], i);

/** 站点代码。与 site.code 对应，见 DESIGN.md §2.1 的多站点设计。 */
export const SITE_LETTER = { "CN-HQ": "C", TH: "T", VN: "V" } as const;
export type SiteLetter = (typeof SITE_LETTER)[keyof typeof SITE_LETTER];

const SEQ_DIGITS = 7; // 每站点每年一千万支，够用很久
export const MAX_SEQ = 10 ** SEQ_DIGITS - 1;

// ---------------------------------------------------------------------------
// 归一化
// ---------------------------------------------------------------------------

/**
 * 把人可能输成的各种样子还原成规范形式：大写、去连字符和空格，
 * 并按 Crockford 的规则把易混字符折回去（I/L → 1，O → 0）。
 *
 * 也就是说 `e26c-ooo1482-k` 和 `E26C0001482K` 是同一个序列号 —— 客户在
 * 电话里念错、把 0 抄成 O，仍然查得到。
 */
export function normalize(input: string): string {
  return input
    .toUpperCase()
    .replace(/[\s-]/g, "")
    .replace(/[IL]/g, "1")
    .replace(/O/g, "0");
}

// ---------------------------------------------------------------------------
// 校验位 —— Luhn mod N (N = 32)
// ---------------------------------------------------------------------------

// 选 Luhn mod N 而不是简单的加权求和：它能查出**全部**单字符错误，以及
// 绝大多数相邻两位对调。手工输入最常见的就是这两类。
function luhnCheckValue(payload: string): number {
  let factor = 2;
  let sum = 0;
  for (let i = payload.length - 1; i >= 0; i--) {
    const v = VALUE.get(payload[i]);
    if (v === undefined) throw new Error(`序列号含非法字符: ${payload[i]}`);
    let addend = factor * v;
    factor = factor === 2 ? 1 : 2;
    addend = Math.floor(addend / RADIX) + (addend % RADIX);
    sum += addend;
  }
  return (RADIX - (sum % RADIX)) % RADIX;
}

/** 给不含校验位的主体算出校验字符。 */
export function checkChar(payload: string): string {
  return ALPHABET[luhnCheckValue(normalize(payload))];
}

// ---------------------------------------------------------------------------
// 生成与解析
// ---------------------------------------------------------------------------

export type SerialParts = {
  /** 出号年份的完整四位，如 2026。 */
  year: number;
  /** 站点字母 C / T / V。 */
  site: SiteLetter;
  /** 该站点该年的流水号。 */
  seq: number;
};

/**
 * 生成规范形式的序列号（无连字符），如 `E26C0001482K`。
 *
 * 结构：E | 年后两位 | 站点 | 7 位流水 | 校验位
 */
export function makeSerial({ year, site, seq }: SerialParts): string {
  if (!Number.isInteger(seq) || seq < 0 || seq > MAX_SEQ) {
    throw new Error(`流水号超出范围 0..${MAX_SEQ}: ${seq}`);
  }
  if (!Number.isInteger(year) || year < 2000 || year > 2099) {
    throw new Error(`年份必须在 2000..2099: ${year}`);
  }
  const body = `E${String(year % 100).padStart(2, "0")}${site}${String(seq).padStart(SEQ_DIGITS, "0")}`;
  return body + checkChar(body);
}

/** 加连字符的展示形式：`E26C-0001482-K`。标签上给人看的就是这个。 */
export function formatSerial(serial: string): string {
  const s = normalize(serial);
  return `${s.slice(0, 4)}-${s.slice(4, 11)}-${s.slice(11)}`;
}

/**
 * 校验并拆解一个序列号。输入可以是任意书写形式（大小写、带不带连字符、
 * O/0 混淆都行）。校验不过返回 null —— 调用方据此拒绝，不要抛异常，
 * 因为「扫到一个不认识的码」是正常业务情况，不是程序错误。
 */
export function parseSerial(input: string): SerialParts | null {
  const s = normalize(input);
  // E + 2 位年 + 1 位站点 + 7 位流水 + 1 位校验 = 12
  if (!/^E\d{2}[CTV]\d{7}[0-9A-Z]$/.test(s)) return null;
  if (s[11] !== checkChar(s.slice(0, 11))) return null;
  return {
    year: 2000 + Number(s.slice(1, 3)),
    site: s[3] as SiteLetter,
    seq: Number(s.slice(4, 11)),
  };
}

// ---------------------------------------------------------------------------
// 签名 —— 防止连号遍历
// ---------------------------------------------------------------------------

// 序列号是连号的。如果公开查询页只要输入序列号就返回结果，任何人写个脚本
// 从 ...0000001 遍历上去，就能把「哪些客户、什么时候、买了多少」全捞走 ——
// 那等于把销售数据公开。
//
// 所以二维码里带一个签名参数：只有拿到实物标签的人才有它，算不出来。
// 见 TRACEABILITY.md §5。
//
// ⚠️ 密钥一旦泄露，全部已印标签的防伪即告失效且无法补救（标签已经在客户
// 手里了）。密钥只存服务端环境变量，绝不进代码库、绝不进前端 bundle。

const SIG_LENGTH = 8; // hex 字符数 = 32 bit。配合限流足够，且不会撑大二维码

/** 算出某个序列号的签名。`secret` 从服务端环境变量读，绝不硬编码。 */
export function signSerial(serial: string, secret: string): string {
  if (!secret) throw new Error("签名密钥为空 —— 检查服务端环境变量是否配置");
  return createHmac("sha256", secret)
    .update(normalize(serial))
    .digest("hex")
    .slice(0, SIG_LENGTH);
}

/** 恒定时间比较，避免通过响应耗时逐字符试探出签名。 */
export function verifySignature(serial: string, signature: string, secret: string): boolean {
  const expected = signSerial(serial, secret);
  const got = (signature ?? "").toLowerCase();
  // timingSafeEqual 要求两边等长，长度不符直接判否（长度本身不是秘密）。
  if (got.length !== expected.length) return false;
  return timingSafeEqual(Buffer.from(expected, "utf8"), Buffer.from(got, "utf8"));
}

// ---------------------------------------------------------------------------
// 二维码内容
// ---------------------------------------------------------------------------

/**
 * 标签二维码里编的是一条完整 URL，不是纯序列号 —— 这样客户用手机相机一扫
 * 就直接打开查询页，不用装 App、不用打字。
 *
 * 用 `/v/` 这样的短路径是为了压缩 URL 长度：URL 越短，二维码模块数越少，
 * 在 40×20mm 的小标签上越容易扫到。
 */
export function verifyUrl(serial: string, secret: string, origin = "https://www.etiatech.com"): string {
  const s = normalize(serial);
  return `${origin.replace(/\/$/, "")}/v/${s}?k=${signSerial(s, secret)}`;
}
