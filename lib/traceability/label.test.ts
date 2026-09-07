// 跑: npm test

import { test } from "node:test";
import assert from "node:assert/strict";

import { formatSerial, makeSerial, verifyUrl } from "./serial.ts";
import { DEFAULT_SERVICE_MARK, renderLabel, renderLabelSheet, type LabelData } from "./label.ts";

const SECRET = "test-secret";
const SERIAL = makeSerial({ year: 2026, site: "C", seq: 1482 });

function device(over: Partial<LabelData> = {}): LabelData {
  return {
    variant: "device",
    serial: SERIAL,
    qrUrl: verifyUrl(SERIAL, SECRET),
    model: "S2000-XLA",
    productName: "OmniCure S2000",
    calibratedOn: "2026-09-07",
    calibrationDueOn: "2027-09-07",
    ...over,
  };
}

function lamp(over: Partial<LabelData> = {}): LabelData {
  return {
    variant: "lamp",
    serial: SERIAL,
    qrUrl: verifyUrl(SERIAL, SECRET),
    model: "012-64000R",
    ...over,
  };
}

// --- 尺寸：标签是物理介质，差一点就贴不进模切位 ----------------------------

test("尺寸以毫米输出,打印才是真实大小", async () => {
  assert.match(await renderLabel(device()), /width="60mm" height="40mm"/);
  assert.match(await renderLabel(lamp()), /width="40mm" height="20mm"/);
});

test("含二维码路径", async () => {
  const svg = await renderLabel(device());
  assert.match(svg, /<path stroke="#000" stroke-width="1" d="M/);
});

// --- 溢出保护：这两条守的是真出过的 bug ------------------------------------

test("序列号必须完整出现,一个字符都不能少", async () => {
  // 曾经在 40×20 的灯泡标签上被裁掉最后一位 —— 而末位正是校验位。
  for (const data of [device(), lamp()]) {
    const svg = await renderLabel(data);
    assert.ok(svg.includes(formatSerial(SERIAL)), `${data.variant} 标签上的序列号不完整`);
  }
});

test("超长产品名不截断就会印到标签外面,所以必须截断", async () => {
  const svg = await renderLabel(device({ productName: "OmniCure R2000 辐照度计 带 365nm 校准证书 长名字" }));
  assert.ok(svg.includes("…"), "超长产品名没有被截断");
  // 但序列号仍然完整 —— 截的是可截的，不是关键标识
  assert.ok(svg.includes(formatSerial(SERIAL)));
});

test("授权声明是对外声明,宁可缩字号也要完整", async () => {
  // 「Excelitas 授权服务商」曾被截成「Excelitas 授权服…」,作为对外声明不合格
  for (const data of [device(), lamp()]) {
    const svg = await renderLabel(data);
    assert.ok(
      svg.includes(DEFAULT_SERVICE_MARK.authority),
      `${data.variant} 标签上的授权声明被截断了`
    );
  }
});

test("授权文案可整体替换,不必改代码", async () => {
  const svg = await renderLabel(
    device({
      serviceMark: { ...DEFAULT_SERVICE_MARK, authority: "OmniCure® 授权经销商" },
    })
  );
  assert.ok(svg.includes("OmniCure® 授权经销商"));
  assert.ok(!svg.includes(DEFAULT_SERVICE_MARK.authority));
});

// --- 校准栏：这张标签的商业核心 --------------------------------------------

test("有校准日期时,下次到期日是标签上最大的字", async () => {
  const svg = await renderLabel(device());
  assert.ok(svg.includes("2027-09-07"));
  const dueSize = Number(svg.match(/font-size="([\d.]+)"[^>]*font-weight="700">2027-09-07/)?.[1]);
  const allSizes = [...svg.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]));
  assert.equal(dueSize, Math.max(...allSizes), "「下次校准」不是最大的字");
});

test("没校准过的设备显示预约邀约,而不是两个破折号", async () => {
  const svg = await renderLabel(device({ calibratedOn: undefined, calibrationDueOn: undefined }));
  assert.ok(svg.includes("尚未预约"));
  assert.ok(!svg.includes("校准 CAL"), "空状态不该还印着空的校准栏");
});

test("灯泡标签没有校准栏 —— 灯泡不做校准", async () => {
  const svg = await renderLabel(lamp());
  assert.ok(!svg.includes("校准"));
});

// --- 打印页 ---------------------------------------------------------------

test("打印页每张标签一页,且页面尺寸等于标签尺寸", async () => {
  const html = await renderLabelSheet([lamp(), lamp(), lamp()]);
  assert.match(html, /@page \{ size: 40mm 20mm; margin: 0; \}/);
  assert.equal(html.match(/class="label"/g)?.length, 3);
  assert.match(html, /break-after: page/);
});

test("打印页提醒关掉缩放 —— 开着缩放尺寸就失真了", async () => {
  const html = await renderLabelSheet([device()]);
  assert.ok(html.includes("缩放以适应纸张"));
});

test("空列表直接报错,而不是产出一张白纸", async () => {
  await assert.rejects(() => renderLabelSheet([]));
});
