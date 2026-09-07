// 跑: npm test   (Node 22 内置 test runner + 类型剥离，无需任何依赖)

import { test } from "node:test";
import assert from "node:assert/strict";

import {
  MAX_SEQ,
  checkChar,
  formatSerial,
  makeSerial,
  normalize,
  parseSerial,
  signSerial,
  verifySignature,
  verifyUrl,
} from "./serial.ts";

const SECRET = "test-secret-not-a-real-key";

test("生成的序列号形如 E26C0001482K,可解析回原值", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  assert.match(s, /^E26C0001482[0-9A-Z]$/);
  assert.deepEqual(parseSerial(s), { year: 2026, site: "C", seq: 1482 });
});

test("展示形式加连字符,且能被解析回来", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  const pretty = formatSerial(s);
  assert.equal(pretty, `E26C-0001482-${s[11]}`);
  assert.deepEqual(parseSerial(pretty), parseSerial(s));
});

test("三个站点各自出号,互不相同", () => {
  const c = makeSerial({ year: 2026, site: "C", seq: 7 });
  const t = makeSerial({ year: 2026, site: "T", seq: 7 });
  const v = makeSerial({ year: 2026, site: "V", seq: 7 });
  assert.equal(new Set([c, t, v]).size, 3);
  assert.equal(parseSerial(t)!.site, "T");
});

// --- 归一化：这才是选 Crockford 的理由 ------------------------------------

test("大小写、连字符、空格都能还原", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  for (const variant of [s.toLowerCase(), formatSerial(s), ` ${formatSerial(s)} `]) {
    assert.deepEqual(parseSerial(variant), { year: 2026, site: "C", seq: 1482 }, variant);
  }
});

test("把 0 抄成 O、把 1 抄成 I 或 L,仍然查得到", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 }); // E26C0001482K
  const mangled = s.replace(/0/g, "O").replace(/1/g, "I");
  assert.notEqual(mangled, s); // 确认这个用例真的改动了字符
  assert.deepEqual(parseSerial(mangled), { year: 2026, site: "C", seq: 1482 });
});

test("normalize 是幂等的", () => {
  const s = formatSerial(makeSerial({ year: 2026, site: "V", seq: 99 }));
  assert.equal(normalize(normalize(s)), normalize(s));
});

// --- 校验位：能挡住什么 -----------------------------------------------------

test("任意单字符打错都会被校验位挡下", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  let checked = 0;
  // 只动流水号那 7 位:年份/站点/前缀改坏了会先被正则挡掉,那是另一层防线
  for (let i = 4; i < 11; i++) {
    for (const d of "0123456789") {
      if (d === s[i]) continue;
      const bad = s.slice(0, i) + d + s.slice(i + 1);
      assert.equal(parseSerial(bad), null, `单字符错误未被发现: ${bad}`);
      checked++;
    }
  }
  assert.ok(checked > 60, `实际检查了 ${checked} 种单字符错误`);
});

test("相邻两位对调会被挡下", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1234567 });
  let caught = 0;
  let swaps = 0;
  for (let i = 4; i < 10; i++) {
    if (s[i] === s[i + 1]) continue; // 相同字符对调等于没调
    const bad = s.slice(0, i) + s[i + 1] + s[i] + s.slice(i + 2);
    swaps++;
    if (parseSerial(bad) === null) caught++;
  }
  assert.ok(swaps > 0);
  assert.equal(caught, swaps, `${swaps} 种对调中只挡下 ${caught} 种`);
});

test("校验位算错的序列号一律拒绝", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  const wrong = s[11] === "Z" ? "Y" : "Z";
  assert.equal(parseSerial(s.slice(0, 11) + wrong), null);
});

test("格式不对的输入返回 null,不抛异常", () => {
  // 「扫到一个不认识的码」是正常业务情况,不该让程序崩掉
  for (const junk of ["", "hello", "E26C0001482", "X26C0001482K", "E26Q0001482K", "012-64000R", "S2000-XL-A-1560"]) {
    assert.equal(parseSerial(junk), null, junk);
  }
});

test("校验位本身也绝不用易混字符", () => {
  // 否则就白费功夫了:主体避开了 I/L/O/U,校验位却吐一个 O 出来
  for (let seq = 0; seq < 500; seq++) {
    const body = `E26C${String(seq).padStart(7, "0")}`;
    assert.doesNotMatch(checkChar(body), /[ILOU]/, `校验位用到了易混字符: ${body}`);
  }
});

// --- 边界 -------------------------------------------------------------------

test("流水号越界会拒绝出号", () => {
  assert.throws(() => makeSerial({ year: 2026, site: "C", seq: -1 }));
  assert.throws(() => makeSerial({ year: 2026, site: "C", seq: MAX_SEQ + 1 }));
  assert.doesNotThrow(() => makeSerial({ year: 2026, site: "C", seq: MAX_SEQ }));
});

test("年份越界会拒绝出号", () => {
  assert.throws(() => makeSerial({ year: 1999, site: "C", seq: 1 }));
  assert.throws(() => makeSerial({ year: 2100, site: "C", seq: 1 }));
});

test("同年同站点连续出号不重复", () => {
  const seen = new Set<string>();
  for (let seq = 0; seq < 3000; seq++) seen.add(makeSerial({ year: 2026, site: "C", seq }));
  assert.equal(seen.size, 3000);
});

// --- 签名 -------------------------------------------------------------------

test("签名稳定,且不同序列号签出不同结果", () => {
  const a = makeSerial({ year: 2026, site: "C", seq: 1482 });
  const b = makeSerial({ year: 2026, site: "C", seq: 1483 });
  assert.equal(signSerial(a, SECRET), signSerial(a, SECRET));
  assert.notEqual(signSerial(a, SECRET), signSerial(b, SECRET));
  assert.match(signSerial(a, SECRET), /^[0-9a-f]{8}$/);
});

test("换了密钥,旧签名立刻失效", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  assert.equal(verifySignature(s, signSerial(s, "old-key"), "new-key"), false);
});

test("签名校验与书写形式无关", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  const sig = signSerial(s, SECRET);
  assert.ok(verifySignature(formatSerial(s), sig, SECRET));
  assert.ok(verifySignature(s.toLowerCase(), sig.toUpperCase(), SECRET));
});

test("签名不对、缺失、长度不符都判否且不抛异常", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  for (const bad of ["", "deadbeef", "00000000", "abc", signSerial(s, SECRET) + "0"]) {
    assert.equal(verifySignature(s, bad, SECRET), false, JSON.stringify(bad));
  }
  // @ts-expect-error 故意传 undefined,模拟 URL 里没有 ?k=
  assert.equal(verifySignature(s, undefined, SECRET), false);
});

test("空密钥直接报错,而不是签出一个可预测的值", () => {
  assert.throws(() => signSerial("E26C0001482K", ""));
});

// --- 二维码 URL -------------------------------------------------------------

test("二维码里是完整 URL,手机相机扫了能直接打开", () => {
  const s = makeSerial({ year: 2026, site: "C", seq: 1482 });
  const url = verifyUrl(s, SECRET);
  const u = new URL(url);
  assert.equal(u.origin, "https://www.etiatech.com");
  assert.equal(u.pathname, `/v/${s}`);
  assert.ok(verifySignature(s, u.searchParams.get("k")!, SECRET));
});

test("URL 长度不超预算,免得二维码在小标签上扫不动", () => {
  const url = verifyUrl(makeSerial({ year: 2026, site: "C", seq: MAX_SEQ }), SECRET);
  // 最长情况实测 50 字符。URL 每长一截,二维码模块数就多一圈,印在 40×20mm
  // 标签上每个模块就更小、更难扫。这条是**预算守卫**:防止以后有人往这个
  // URL 上加查询参数(utm、语言、渠道…)把码撑大而没人注意到。
  // 真要加参数,应该先量一下实际标签上的扫描成功率再改这个上限。
  assert.ok(url.length <= 60, `URL 长度 ${url.length},超出预算: ${url}`);
});

test("origin 可覆盖,且末尾斜杠不会拼出双斜杠", () => {
  const s = makeSerial({ year: 2026, site: "T", seq: 1 });
  assert.ok(verifyUrl(s, SECRET, "https://etia.example/").startsWith("https://etia.example/v/"));
});
