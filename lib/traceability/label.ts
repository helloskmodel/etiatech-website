// ETIA 追溯标签 —— 生成可直接打印的 SVG。
//
// 两种规格，同一套视觉语言（TRACEABILITY.md §2.5）：
//
//   device 60×40mm —— 贴在主机上，一贴就是好几年。除了身份，还承载**校准
//     日期与下次到期日**。这张标签是最便宜的销售工具：它天天躺在客户设备上，
//     写着 ETIA 的名字和「下次校准」，到期客户自然会打电话过来。
//
//   lamp   40×20mm —— 贴在灯泡包装盒上。灯泡不做校准，所以没有校准栏。
//     盒子可能被客户拆掉丢弃，所以出货单上也会同时列出序列号（§2.3）。
//
// 尺寸用毫米，SVG 的 width/height 也写成毫米单位，浏览器打印时才是**真实
// 尺寸**——差一点，标签就贴不进模切位置。

import QRCode from "qrcode";
import { formatSerial } from "./serial.ts";

// ---------------------------------------------------------------------------
// 服务商信息 —— 集中在一处，改文案只改这里
// ---------------------------------------------------------------------------

// ⚠️ 授权表述是**对外的事实声明**，而且印在标签上就跟着设备走好几年，比网页
// 难纠正得多。网站现有表述是「OmniCure® 授权经销商（指定地区）」，与下面的
// 「Excelitas 授权服务商」范围不同（Excelitas 是母公司，产品线远不止 OmniCure；
// 「经销」与「服务」也是两种不同的授权）。用哪一句需与原厂书面授权核对后确定，
// 见 TRACEABILITY.md §10。
export type ServiceMark = {
  /** 授权声明行，例如「Excelitas 授权服务商」。 */
  authority: string;
  /** 主体公司全称。 */
  company: string;
  /** 服务承诺短句。 */
  tagline: string;
  /** 联系方式：网址或电话，客户看到标签后照着找过来。 */
  contact: string;
};

export const DEFAULT_SERVICE_MARK: ServiceMark = {
  authority: "Excelitas 授权服务商",
  company: "上海怡天科技有限公司",
  tagline: "竭诚为您服务",
  contact: "www.etiatech.com",
};

// ---------------------------------------------------------------------------
// 规格
// ---------------------------------------------------------------------------

export type LabelVariant = "device" | "lamp";

type Spec = {
  w: number; // mm
  h: number;
  pad: number;
  qr: number; // 二维码边长 mm
};

const SPEC: Record<LabelVariant, Spec> = {
  device: { w: 60, h: 40, pad: 2.5, qr: 21 },
  lamp: { w: 40, h: 20, pad: 1.6, qr: 14.5 },
};

export type LabelData = {
  variant: LabelVariant;
  /** ETIA 序列号，任意书写形式皆可，内部会归一化。 */
  serial: string;
  /** 二维码里编的完整 URL，用 serial.ts 的 verifyUrl() 生成。 */
  qrUrl: string;
  /** 型号：灯泡是 Part Number（012-64000R），设备是型号（S2000-XLA）。 */
  model: string;
  /** 可读产品名，如 “OmniCure S2000”。设备标签才有空间放。 */
  productName?: string;
  /** 本次校准日期 YYYY-MM-DD。仅 device，且仅在做过校准后才有。 */
  calibratedOn?: string;
  /** 下次校准到期日 YYYY-MM-DD。 */
  calibrationDueOn?: string;
  serviceMark?: ServiceMark;
};

// ---------------------------------------------------------------------------
// 二维码
// ---------------------------------------------------------------------------

/**
 * 生成二维码，返回路径数据与模块数，供调用方按需缩放。
 *
 * 纠错等级用 M：标签贴在设备上会被蹭、被油污沾到，L 太脆弱；用 Q/H 会让模块
 * 变多、单个模块变小，在小标签上反而更难扫。M 是这个尺寸下的平衡点。
 */
async function qrPath(url: string): Promise<{ d: string; modules: number }> {
  const svg = await QRCode.toString(url, {
    type: "svg",
    errorCorrectionLevel: "M",
    margin: 0,
  });
  const modules = Number(svg.match(/viewBox="0 0 (\d+) \d+"/)?.[1]);
  // qrcode 输出两条 path：先白底，后黑色模块（带 stroke）。要的是后者。
  const d = svg.match(/<path stroke="#000000" d="([^"]+)"/)?.[1];
  if (!modules || !d) throw new Error("二维码生成结果无法解析，qrcode 版本可能变了");
  return { d, modules };
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");

// ---------------------------------------------------------------------------
// 排版：标签是固定尺寸的物理介质，文字**溢出就是废品**
// ---------------------------------------------------------------------------

// SVG 没有自动换行也没有溢出裁剪，长一点的产品名会直接印到标签外面。所以在
// 生成前先估算宽度。中日韩字符与全角标点按 1 em，其余按拉丁字宽算。
const CJK = /[\u2E80-\u9FFF\uFF00-\uFF60\u3000-\u303F]/;

function textWidth(text: string, fontSize: number, mono = false): number {
  const latin = mono ? 0.6 : 0.55;
  let em = 0;
  for (const ch of text) em += CJK.test(ch) ? 1 : latin;
  return em * fontSize;
}

/** 放不下就截断加省略号。用于产品名、公司名这类可以截的文字。 */
function fit(text: string, maxWidth: number, fontSize: number, mono = false): string {
  if (textWidth(text, fontSize, mono) <= maxWidth) return text;
  let out = "";
  for (const ch of text) {
    if (textWidth(out + ch + "…", fontSize, mono) > maxWidth) break;
    out += ch;
  }
  return out + "…";
}

/**
 * 放不下就缩小字号。用于**序列号**——它绝不能被截断：少一位就查不到，
 * 而末位恰好是校验位，截掉等于把校验能力丢了。
 */
function fitSize(text: string, maxWidth: number, preferred: number, mono = true): number {
  const w = textWidth(text, preferred, mono);
  return w <= maxWidth ? preferred : Math.floor(((preferred * maxWidth) / w) * 100) / 100;
}

// 热转印在 2mm 以下的中文笔画会糊成一团，低于这个尺寸宁可截断也别硬缩。
const MIN_PRINT_SIZE = 1.7;

/**
 * 一行文字的自适应：**先缩字号，缩到印不清了才截断**。
 *
 * 用于授权声明、公司名这类既不该截、又必须完整表达意思的文字 —— 「Excelitas
 * 授权服务商」被截成「Excelitas 授权服…」，作为对外声明是不合格的。
 */
function fitLine(
  text: string,
  maxWidth: number,
  preferred: number,
  mono = false
): { text: string; size: number } {
  const size = Math.max(fitSize(text, maxWidth, preferred, mono), MIN_PRINT_SIZE);
  return { text: fit(text, maxWidth, size, mono), size };
}

// ---------------------------------------------------------------------------
// 渲染
// ---------------------------------------------------------------------------

/** 渲染一张标签为独立的 SVG 字符串（真实毫米尺寸）。 */
export async function renderLabel(data: LabelData): Promise<string> {
  const s = SPEC[data.variant];
  const mark = data.serviceMark ?? DEFAULT_SERVICE_MARK;
  const { d, modules } = await qrPath(data.qrUrl);

  const qrX = s.pad;
  const qrY = (s.h - s.qr) / 2;
  // 二维码原始坐标是「每模块 1 单位」，缩放到目标毫米尺寸。
  // stroke-width 1 + 半像素偏移是 qrcode 的绘制方式，缩放后依然成立。
  const qr =
    `<g transform="translate(${qrX} ${qrY}) scale(${s.qr / modules})">` +
    `<path stroke="#000" stroke-width="1" d="${d}"/></g>`;

  const tx = qrX + s.qr + s.pad; // 文字区左边界
  const tw = s.w - tx - s.pad; // 文字区可用宽度
  const body =
    data.variant === "device" ? deviceBody(data, mark, tx, tw, s) : lampBody(data, mark, tx, s);

  return (
    `<svg xmlns="http://www.w3.org/2000/svg" width="${s.w}mm" height="${s.h}mm" ` +
    `viewBox="0 0 ${s.w} ${s.h}" shape-rendering="crispEdges">` +
    `<rect width="${s.w}" height="${s.h}" fill="#fff"/>` +
    qr +
    body +
    `</svg>`
  );
}

function deviceBody(data: LabelData, mark: ServiceMark, tx: number, tw: number, s: Spec): string {
  const F = `font-family="'Noto Sans SC','Source Han Sans SC','Microsoft YaHei',sans-serif"`;
  const parts: string[] = [];

  parts.push(
    `<text x="${tx}" y="5.2" ${F} font-size="2.9" font-weight="700">${esc(
      fit(data.productName ?? data.model, tw, 2.9)
    )}</text>`
  );
  // 序列号用等宽字体：客户要在电话里念它、或抄进搜索框，字形必须无歧义。
  // 字号自适应而**绝不截断** —— 末位是校验位，少一个字符就白做了。
  const serialText = formatSerial(data.serial);
  parts.push(
    `<text x="${tx}" y="9.4" font-family="'IBM Plex Mono',ui-monospace,monospace" ` +
      `font-size="${fitSize(serialText, tw, 3.4)}" font-weight="600">${esc(serialText)}</text>`
  );
  parts.push(`<line x1="${tx}" y1="11.4" x2="${tx + tw}" y2="11.4" stroke="#000" stroke-width="0.15"/>`);

  // 校准栏 —— 这张标签的商业核心。「下次校准」比其他任何字都大：它天天躺在
  // 客户设备上，到期客户自然会打电话过来。
  if (data.calibrationDueOn) {
    parts.push(
      `<text x="${tx}" y="15" ${F} font-size="2.3" fill="#333">校准 CAL　${esc(
        data.calibratedOn ?? "—"
      )}</text>`
    );
    parts.push(`<text x="${tx}" y="19.4" ${F} font-size="2.3" fill="#333">下次校准 DUE</text>`);
    parts.push(
      `<text x="${tx}" y="24.4" font-family="'IBM Plex Mono',ui-monospace,monospace" ` +
        `font-size="4.2" font-weight="700">${esc(data.calibrationDueOn)}</text>`
    );
  } else {
    // 还没校准过的设备：与其印两个没意义的破折号,不如把这块地方变成邀约。
    parts.push(`<text x="${tx}" y="16" ${F} font-size="2.5" fill="#333">年度校准</text>`);
    parts.push(
      `<text x="${tx}" y="21.5" ${F} font-size="3.6" font-weight="700">尚未预约</text>`
    );
    parts.push(
      `<text x="${tx}" y="25.4" ${F} font-size="2.1" fill="#444">${esc(
        fit("扫码或来电预约", tw, 2.1)
      )}</text>`
    );
  }

  // 服务商信息：跨整张标签下缘，客户看一眼就知道找谁
  const y0 = s.h - 8.6;
  parts.push(
    `<line x1="${s.pad}" y1="${y0}" x2="${s.w - s.pad}" y2="${y0}" stroke="#000" stroke-width="0.15"/>`
  );
  const mw = s.w - 2 * s.pad;
  for (const [dy, raw, pref, weight, fill] of [
    [3, mark.authority, 2.5, "700", "#000"],
    [5.9, `${mark.company} ${mark.tagline}`, 2.4, "400", "#000"],
    [8.3, `${mark.contact}　${data.model}`, 2.1, "400", "#444"],
  ] as const) {
    const line = fitLine(raw, mw, pref);
    parts.push(
      `<text x="${s.pad}" y="${y0 + dy}" ${F} font-size="${line.size}" ` +
        `font-weight="${weight}" fill="${fill}">${esc(line.text)}</text>`
    );
  }
  return parts.join("");
}

function lampBody(data: LabelData, mark: ServiceMark, tx: number, s: Spec): string {
  const F = `font-family="'Noto Sans SC','Source Han Sans SC','Microsoft YaHei',sans-serif"`;
  const tw = s.w - tx - s.pad;
  const serialText = formatSerial(data.serial);
  return [
    `<text x="${tx}" y="4.6" ${F} font-size="2.5" font-weight="700">${esc(
      fit(data.model, tw, 2.5)
    )}</text>`,
    // 同样：字号自适应，绝不截断序列号
    `<text x="${tx}" y="8.9" font-family="'IBM Plex Mono',ui-monospace,monospace" ` +
      `font-size="${fitSize(serialText, tw, 2.9)}" font-weight="600">${esc(serialText)}</text>`,
    `<line x1="${tx}" y1="10.6" x2="${s.w - s.pad}" y2="10.6" stroke="#000" stroke-width="0.12"/>`,
    ...([
      [13.6, mark.authority, 2.1, "700", "#000"],
      [16.3, mark.company, 2.0, "400", "#000"],
      [18.6, mark.contact, 1.8, "400", "#444"],
    ] as const).map(([y, raw, pref, weight, fill]) => {
      const line = fitLine(raw, tw, pref);
      return (
        `<text x="${tx}" y="${y}" ${F} font-size="${line.size}" ` +
        `font-weight="${weight}" fill="${fill}">${esc(line.text)}</text>`
      );
    }),
  ].join("");
}

// ---------------------------------------------------------------------------
// 批量打印页
// ---------------------------------------------------------------------------

/**
 * 把多张标签排成一页可打印的 HTML。
 *
 * `@page` 的尺寸设成单张标签的大小、页边距为 0 —— 标签打印机走的是连续卷纸，
 * 一张标签就是一页。浏览器打印时必须关掉「缩放以适应」，否则毫米尺寸会失真。
 */
export async function renderLabelSheet(
  labels: LabelData[],
  title = "ETIA 标签",
  opts: { autoPrint?: boolean } = {}
): Promise<string> {
  if (labels.length === 0) throw new Error("没有要打印的标签");
  const s = SPEC[labels[0].variant];
  const svgs = await Promise.all(labels.map(renderLabel));

  // 自动调起打印。配合 Chrome 的 --kiosk-printing 启动参数,打印对话框不会
  // 弹出,标签直接从默认打印机出来 —— 仓库里点一下就完事,不用每次去对话框里
  // 选打印机、关缩放。没加那个参数时照常弹对话框,不影响使用。
  //
  // 等 document.fonts.ready:中文字体没加载完就打印,字会以后备字体印出来,
  // 字宽不同会让排版走样。
  const autoPrint = opts.autoPrint
    ? `<script>
  window.addEventListener("load", function () {
    var go = function () { window.print(); };
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(go, go);
    else go();
  });
</script>`
    : "";

  return `<!doctype html>
<html lang="zh-CN"><head><meta charset="utf-8">
<title>${esc(title)}</title>
<style>
  @page { size: ${s.w}mm ${s.h}mm; margin: 0; }
  body { margin: 0; background: #eef1f5;
         font-family: 'Noto Sans SC','Microsoft YaHei',sans-serif; }
  .sheet { display: flex; flex-wrap: wrap; gap: 6mm; padding: 8mm; }
  .label { background: #fff; box-shadow: 0 1px 4px rgba(0,0,0,.18);
           width: ${s.w}mm; height: ${s.h}mm; }
  .hint { padding: 8mm 8mm 0; font-size: 13px; color: #444; max-width: 60em; line-height: 1.7; }
  @media print {
    body { background: #fff; }
    .hint { display: none; }
    .sheet { gap: 0; padding: 0; }
    .label { box-shadow: none; page-break-after: always; break-after: page; }
  }
</style></head>
<body>
<p class="hint">共 ${labels.length} 张 · 单张 ${s.w}×${s.h} mm。
打印时请<b>关闭「缩放以适应纸张」</b>，否则毫米尺寸会失真、贴不进模切位置。</p>
<div class="sheet">${svgs.map((x) => `<div class="label">${x}</div>`).join("")}</div>
${autoPrint}
</body></html>`;
}
