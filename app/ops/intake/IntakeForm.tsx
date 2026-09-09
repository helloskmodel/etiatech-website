"use client";
import { useState } from "react";

type Option = { code: string; label: string; kind?: string };

type Unit = { serial: string; oemSerial: string | null; qrUrl: string };

// 入库开单。仓库场景:操作员站着、可能戴手套、一箱几十支要连着做几箱,
// 所以输入框大、每箱录一次批次、提交后立刻能打标签,不用来回翻页面。
export default function IntakeForm({ sites, items }: { sites: Option[]; items: Option[] }) {
  const [siteCode, setSiteCode] = useState(sites[0]?.code ?? "");
  const [itemCode, setItemCode] = useState(items[0]?.code ?? "");
  const [qty, setQty] = useState("");
  const [oemLotRaw, setOemLotRaw] = useState("");
  const [poNo, setPoNo] = useState("");
  const [status, setStatus] = useState<"idle" | "saving" | "done" | "error">("idle");
  const [err, setErr] = useState("");
  const [units, setUnits] = useState<Unit[]>([]);

  const item = items.find((i) => i.code === itemCode);
  const isDevice = item?.kind === "device";

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setErr("");
    setStatus("saving");
    try {
      const res = await fetch("/api/ops/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ siteCode, itemCode, qty: Number(qty), oemLotRaw, poNo }),
      });
      const data = await res.json();
      if (!res.ok) {
        setErr(data.message || `入库失败（${data.error ?? res.status}）`);
        setStatus("error");
        return;
      }
      setUnits(data.units);
      setStatus("done");
    } catch {
      setErr("网络错误，请重试。这一箱没有入库，可以直接重新提交。");
      setStatus("error");
    }
  }

  // 标签由服务端生成 —— 二维码里的签名密钥不能进浏览器，密钥泄露会让全部
  // 已印标签的防伪失效且无法补救。所以这里取回渲染好的 HTML 再开窗口打印。
  function printLabels() {
    setErr("");
    fetch("/api/ops/labels", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ serials: units.map((u) => u.serial), autoPrint: true }),
    })
      .then((r) => (r.ok ? r.text() : Promise.reject(new Error("标签生成失败"))))
      .then((html) => {
        const w = window.open("", "_blank");
        if (!w) {
          setErr("浏览器拦截了新窗口，请允许弹窗后重试。");
          return;
        }
        w.document.write(html);
        w.document.close();
      })
      .catch((e) => setErr(e.message));
  }

  function next() {
    setUnits([]);
    setQty("");
    setStatus("idle");
    setErr("");
    // 批次和采购单号通常同一批货连着录几箱,保留着省事。
  }

  const field =
    "w-full rounded-lg border border-gray-300 px-4 py-3 text-base text-gray-900 outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15";
  const label = "block text-sm font-semibold text-gray-700 mb-1.5";

  if (status === "done") {
    return (
      <div className="flex flex-col gap-5">
        <div className="rounded-xl border border-green-200 bg-green-50 p-5">
          <p className="text-lg font-bold text-green-900">
            已入库 {units.length} 支 · 号段 {units[0]?.serial} … {units[units.length - 1]?.serial}
          </p>
          <p className="mt-1 text-sm text-green-800">
            下一步：打印标签并逐支贴上。<b>贴完再点「继续下一箱」</b>，避免漏贴。
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <button
            onClick={printLabels}
            className="rounded-lg bg-[#1A56DB] px-6 py-3 text-base font-bold text-white hover:opacity-90"
          >
            打印 {units.length} 张标签
          </button>
          <button
            onClick={next}
            className="rounded-lg border border-gray-300 px-6 py-3 text-base font-semibold text-gray-700 hover:bg-gray-50"
          >
            继续下一箱
          </button>
        </div>

        {err && <p className="text-sm font-medium text-red-600">{err}</p>}

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-left text-xs uppercase tracking-wider text-gray-500">
              <tr>
                <th className="px-4 py-2.5 font-semibold">#</th>
                <th className="px-4 py-2.5 font-semibold">ETIA 序列号</th>
                {isDevice && <th className="px-4 py-2.5 font-semibold">原厂序列号</th>}
              </tr>
            </thead>
            <tbody>
              {units.map((u, i) => (
                <tr key={u.serial} className="border-t border-gray-100">
                  <td className="px-4 py-2 text-gray-400 tabular-nums">{i + 1}</td>
                  <td className="px-4 py-2 font-mono font-semibold tabular-nums">{u.serial}</td>
                  {isDevice && (
                    <td className="px-4 py-2 font-mono text-gray-600">{u.oemSerial ?? "—"}</td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={submit} className="flex flex-col gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="site">站点</label>
          <select id="site" value={siteCode} onChange={(e) => setSiteCode(e.target.value)} className={field}>
            {sites.map((s) => (
              <option key={s.code} value={s.code}>{s.label}</option>
            ))}
          </select>
        </div>
        <div>
          <label className={label} htmlFor="item">型号 / Part Number</label>
          <select id="item" value={itemCode} onChange={(e) => setItemCode(e.target.value)} className={field}>
            {items.map((i) => (
              <option key={i.code} value={i.code}>{i.label}</option>
            ))}
          </select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={label} htmlFor="lot">
            批次号 Lot（照抄盒上手写的，一箱录一次）
          </label>
          <input
            id="lot"
            value={oemLotRaw}
            onChange={(e) => setOemLotRaw(e.target.value)}
            placeholder="28/2026 019"
            className={`${field} font-mono`}
          />
          <p className="mt-1.5 text-xs text-gray-500">
            原样照抄，看不清就照原样打问号——<b>不要自己猜</b>。
          </p>
        </div>
        <div>
          <label className={label} htmlFor="po">采购单号（可空）</label>
          <input id="po" value={poNo} onChange={(e) => setPoNo(e.target.value)} placeholder="PO-2026-0088" className={`${field} font-mono`} />
        </div>
      </div>

      <div className="sm:max-w-[12rem]">
        <label className={label} htmlFor="qty">本箱数量</label>
        <input
          id="qty"
          type="number"
          min={1}
          required
          value={qty}
          onChange={(e) => setQty(e.target.value)}
          className={`${field} text-2xl font-bold tabular-nums`}
        />
      </div>

      {err && <p className="text-sm font-medium text-red-600">{err}</p>}

      <button
        type="submit"
        disabled={status === "saving" || !qty}
        className="self-start rounded-lg bg-[#1A56DB] px-8 py-3.5 text-base font-bold text-white hover:opacity-90 disabled:opacity-50"
      >
        {status === "saving" ? "发号中…" : "入库并发号"}
      </button>
    </form>
  );
}
