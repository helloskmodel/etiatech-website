// 入库 —— 收一箱货,发号建档。内部接口:proxy.ts 已按 DEPLOY_ROLE 把
// /api/ops/* 在境外部署上挡成 404,这里再验一次访问口令(纵深防御)。

import { receiveIntake, type IntakeInput } from "@/lib/traceability/intake";
import { withTransaction } from "@/lib/traceability/db";
import { opsAuthorized, opsDenied } from "@/lib/traceability/opsAuth";
import { verifyUrl } from "@/lib/traceability/serial";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

const str = (v: unknown, max = 200) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export async function POST(request: Request) {
  if (!opsAuthorized(request)) return opsDenied();

  let body: Record<string, unknown>;
  try {
    body = (await request.json()) as Record<string, unknown>;
  } catch {
    return Response.json({ error: "bad_request" }, { status: 400 });
  }

  const qty = Number(body.qty);
  const input: IntakeInput = {
    siteCode: str(body.siteCode, 20),
    itemCode: str(body.itemCode, 60),
    qty,
    oemLotRaw: str(body.oemLotRaw, 60) || undefined,
    poNo: str(body.poNo, 60) || undefined,
    receivedBy: Number(body.receivedBy) || undefined,
    scanSource: "manual",
    oemSerials: Array.isArray(body.oemSerials)
      ? body.oemSerials.map((s) => str(s, 80) || null)
      : undefined,
  };

  const secret = process.env.TRACE_SIGNING_SECRET;
  if (!secret) {
    // 没有签名密钥就发不出可查询的二维码,与其发一批查不了的号,不如当场拒绝。
    return Response.json({ error: "signing_secret_missing" }, { status: 503 });
  }

  try {
    const result = await withTransaction((client) => receiveIntake(client, input));
    return Response.json({
      ok: true,
      batchId: result.batchId,
      units: result.units.map((u) => ({
        serial: u.serial,
        oemSerial: u.oemSerial,
        qrUrl: verifyUrl(u.serial, secret),
      })),
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "未知错误";
    // 业务性拒绝(数量非法、站点不存在…)对操作员是有用的提示,原样回传;
    // 其余异常只记日志,不把数据库内部信息漏给前端。
    const expected = /数量必须|站点不存在|物料不存在|号段已用尽/.test(message);
    if (!expected) console.error("[ops/intake] failed:", err);
    return Response.json(
      { error: expected ? "rejected" : "server_error", message: expected ? message : undefined },
      { status: expected ? 422 : 500 }
    );
  }
}
