"use client";
import { useState } from "react";

import { OPS_COOKIE } from "@/lib/traceability/opsCookie";

// 临时口令闸门。最终会换成企业微信免登(DESIGN.md §2.4),那时员工在企业微信里
// 点开就是自己的身份,不需要记任何口令。
export default function OpsGate() {
  const [token, setToken] = useState("");
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        // 8 小时后过期:仓库电脑是共用的,不该一直留着。
        document.cookie = `${OPS_COOKIE}=${encodeURIComponent(token)}; path=/; max-age=${8 * 3600}; samesite=lax`;
        location.reload();
      }}
      className="mx-auto mt-24 flex max-w-sm flex-col gap-3 px-6"
    >
      <h1 className="text-lg font-bold text-gray-900">ETIA 内部系统</h1>
      <input
        type="password"
        value={token}
        onChange={(e) => setToken(e.target.value)}
        placeholder="访问口令"
        autoFocus
        className="rounded-lg border border-gray-300 px-4 py-3 text-base outline-none focus:border-[#1A56DB] focus:ring-2 focus:ring-[#1A56DB]/15"
      />
      <button type="submit" className="rounded-lg bg-[#1A56DB] px-4 py-3 text-base font-bold text-white">
        进入
      </button>
    </form>
  );
}
