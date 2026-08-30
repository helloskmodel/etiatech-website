import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Hide /my routes if SITE_MY_PUBLISHED is not "true"
  if (pathname.startsWith("/my") && process.env.SITE_MY_PUBLISHED !== "true") {
    return NextResponse.notFound();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
