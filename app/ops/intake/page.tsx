// 入库开单页。**内部页面** —— proxy.ts 已按 DEPLOY_ROLE 把 /ops/* 在境外
// 部署上挡成 404，这里再验一次访问口令（纵深防御）。
//
// 站点与物料从数据库读，不写死：新加一个站点或一个新型号，这里自动出现。

import type { Metadata } from "next";
import { cookies } from "next/headers";

import { getPool } from "@/lib/traceability/db";
import { OPS_COOKIE } from "@/lib/traceability/opsCookie";
import { opsTokenValid } from "@/lib/traceability/opsAuth";

import IntakeForm from "./IntakeForm";
import OpsGate from "./OpsGate";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

// 内部页面永远不该进搜索引擎。
export const metadata: Metadata = {
  title: "入库 · ETIA 内部系统",
  robots: { index: false, follow: false },
};

export default async function IntakePage() {
  const token = (await cookies()).get(OPS_COOKIE)?.value;
  if (!opsTokenValid(token)) return <OpsGate />;

  const pool = getPool();
  const [sites, items] = await Promise.all([
    pool.query<{ code: string; name: string }>(
      `select code, coalesce(name_i18n->>'zh', name_i18n->>'en', code) as name
         from site order by code`
    ),
    pool.query<{ code: string; name: string; kind: string }>(
      `select code, coalesce(name_i18n->>'zh', name_i18n->>'en', code) as name, kind
         from item where kind in ('lamp','device') order by kind desc, code`
    ),
  ]);

  if (items.rowCount === 0) {
    return (
      <main className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="text-xl font-bold text-gray-900">入库</h1>
        <p className="mt-3 text-sm text-gray-600">
          物料主数据还是空的 —— 先在 <code className="font-mono">item</code> 表里录入型号
          （灯泡的 Part Number、设备型号），这个页面才有东西可选。
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto max-w-3xl px-6 py-10 sm:py-14">
      <p className="text-xs font-bold uppercase tracking-[.16em] text-[#1A56DB]">ETIA 内部系统</p>
      <h1 className="mt-2 text-2xl font-bold tracking-tight text-gray-900">入库开单</h1>
      <p className="mt-2 max-w-prose text-sm leading-relaxed text-gray-600">
        灯泡包装盒上只有型号和手写批次，没有唯一序列号。这里按整箱发号并打印二维码标签，
        从这一刻起每一支都能被单独追踪。
      </p>

      <div className="mt-8">
        <IntakeForm
          sites={sites.rows.map((s) => ({ code: s.code, label: `${s.name}（${s.code}）` }))}
          items={items.rows.map((i) => ({
            code: i.code,
            label: `${i.code} · ${i.name}`,
            kind: i.kind,
          }))}
        />
      </div>
    </main>
  );
}
