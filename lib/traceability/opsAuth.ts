// 内部系统的访问闸门（临时方案）。
//
// 最终形态是企业微信免登（DESIGN.md §2.4 的 IdentityProvider）。在那之前先用
// 一个共享口令挡住 —— 它挡不住内部人互相冒用，但足以保证「即使这份部署被
// 意外暴露到公网，也不会有人随手就能发号、改库存」。
//
// 两条刻意的设计：
//   · 没配 OPS_ACCESS_TOKEN 就一律拒绝（fail closed）。配错了顶多用不了，
//     忘了配却全网开放是不可接受的。
//   · 恒定时间比较，避免按响应耗时逐字符试探出口令。

import { timingSafeEqual } from "node:crypto";

import { OPS_COOKIE } from "./opsCookie.ts";

export { OPS_COOKIE };

function sameSecret(a: string, b: string): boolean {
  const x = Buffer.from(a, "utf8");
  const y = Buffer.from(b, "utf8");
  // 长度不同直接判否；长度本身不是秘密，但不能拿去喂 timingSafeEqual（会抛）。
  if (x.length !== y.length) return false;
  return timingSafeEqual(x, y);
}

/** 请求是否获准访问内部系统。 */
export function opsAuthorized(request: Request): boolean {
  const expected = process.env.OPS_ACCESS_TOKEN;
  if (!expected) return false; // fail closed

  const header = request.headers.get("x-ops-token");
  if (header && sameSecret(expected, header)) return true;

  const cookie = request.headers.get("cookie") ?? "";
  const m = cookie.match(new RegExp(`(?:^|;\\s*)${OPS_COOKIE}=([^;]+)`));
  return m ? sameSecret(expected, decodeURIComponent(m[1])) : false;
}

/** 供服务端组件用：直接比对一个已经取出来的口令值。 */
export function opsTokenValid(token: string | undefined): boolean {
  const expected = process.env.OPS_ACCESS_TOKEN;
  if (!expected || !token) return false; // fail closed
  return sameSecret(expected, token);
}

/** 未授权时的统一响应：404 而不是 401 —— 不确认这里有东西。 */
export function opsDenied(): Response {
  return new Response(null, { status: 404 });
}
