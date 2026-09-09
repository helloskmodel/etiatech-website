// 按序列号生成可直接打印的标签页(HTML)。内部接口。
//
// 之所以由服务端生成而不是前端画:二维码里要带 HMAC 签名,而签名密钥
// 绝不能进浏览器 —— 密钥一旦泄露,全部已印标签的防伪即告失效且无法补救
// (标签已经在客户手里了)。见 TRACEABILITY.md §2.5。

import { renderLabelSheet, type LabelData, type LabelVariant } from "@/lib/traceability/label";
import { getPool } from "@/lib/traceability/db";
import { opsAuthorized, opsDenied } from "@/lib/traceability/opsAuth";
import { normalize, verifyUrl } from "@/lib/traceability/serial";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function POST(request: Request) {
  if (!opsAuthorized(request)) return opsDenied();

  const secret = process.env.TRACE_SIGNING_SECRET;
  if (!secret) return Response.json({ error: "signing_secret_missing" }, { status: 503 });

  let body: { serials?: unknown; autoPrint?: unknown };
  try {
    body = (await request.json()) as { serials?: unknown; autoPrint?: unknown };
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const serials = Array.isArray(body.serials)
    ? body.serials.filter((s): s is string => typeof s === "string").map(normalize)
    : [];
  if (serials.length === 0) return Response.json({ error: "no_serials" }, { status: 422 });
  // 一次打太多会让页面大到浏览器卡死,而仓库一箱通常也就几十支。
  if (serials.length > 500) return Response.json({ error: "too_many" }, { status: 422 });

  // 标签上的型号、产品名、校准到期日都从库里取 —— 不信任前端传来的值,
  // 印错了要撕下来重贴。
  const { rows } = await getPool().query<{
    serial: string;
    kind: LabelVariant | "accessory";
    code: string;
    name_zh: string | null;
    calibrated_on: string | null;
    due_on: string | null;
  }>(
    `select u.serial,
            i.kind,
            i.code,
            i.name_i18n->>'zh'      as name_zh,
            cal.calibrated_on::text as calibrated_on,
            cal.due_on::text        as due_on
       from unit u
       join item i on i.id = u.item_id
       left join unit_calibration cal on cal.unit_id = u.id
      where u.serial = any($1)`,
    [serials]
  );

  const found = new Map(rows.map((r) => [r.serial, r]));
  const missing = serials.filter((s) => !found.has(s));
  if (missing.length) {
    return Response.json({ error: "unknown_serials", missing }, { status: 422 });
  }

  // 按传入顺序出标签,和入库发号顺序一致,贴的时候不容易错位。
  const labels: LabelData[] = serials.map((serial) => {
    const r = found.get(serial)!;
    const variant: LabelVariant = r.kind === "lamp" ? "lamp" : "device";
    return {
      variant,
      serial,
      qrUrl: verifyUrl(serial, secret),
      model: r.code,
      productName: r.name_zh ?? undefined,
      calibratedOn: r.calibrated_on ?? undefined,
      calibrationDueOn: r.due_on ?? undefined,
    };
  });

  const html = await renderLabelSheet(labels, `ETIA 标签 ${labels.length} 张`, {
    autoPrint: body.autoPrint === true,
  });
  return new Response(html, {
    headers: { "Content-Type": "text/html; charset=utf-8", "Cache-Control": "no-store" },
  });
}
