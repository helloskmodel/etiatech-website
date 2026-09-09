import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Proxy (Next.js 16's name for Middleware — same functionality).
//
// Its only job: tell the (main) layout that the request is for the bare
// homepage, which layouts can't work out on their own (they get no pathname).
//
// Why the homepage is special: www.etiatech.com is the front door for every
// market at once. Someone browsing from Bangkok may be a Thai engineer, an
// American buyer posted there, or a Chinese customer on a trip — the country
// they happen to be in says very little about the language they read. So the
// bare domain always opens in English, the site's common language, and each
// language keeps its own home URL (/zh, /vi, /th) for visitors who want it.
//
// The matcher is deliberately just "/" so this runs on one route and leaves
// every other page untouched. A client could of course send this header itself
// on some other path — the only effect would be to render that page in English
// for themselves, so there is nothing to guard.
const PATHNAME_HEADER = "x-etia-pathname";

// 内部系统(入库/出货扫描)只在国内腾讯云那份部署上开放,境外 Vercel 那份
// 必须看不见它 —— 见 TRACEABILITY.md §6.2。用部署角色控制:腾讯云那边设
// DEPLOY_ROLE=internal,Vercel 不设,于是 /ops 与 /api/ops 在公网上直接 404,
// 跟不存在一样(不是 403 —— 403 等于告诉别人这里有东西)。
const INTERNAL = process.env.DEPLOY_ROLE === "internal";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!INTERNAL && (pathname === "/ops" || pathname.startsWith("/ops/") ||
                    pathname === "/api/ops" || pathname.startsWith("/api/ops/"))) {
    return new NextResponse(null, { status: 404 });
  }

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set(PATHNAME_HEADER, pathname);
  return NextResponse.next({ request: { headers: requestHeaders } });
}

export const config = {
  matcher: ["/", "/ops/:path*", "/api/ops/:path*"],
};
