import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AccessToken, appRouteLinks } from "./utils/constants";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get(AccessToken);

  if (cookie?.value && request.nextUrl.pathname === appRouteLinks.login) {
    return NextResponse.rewrite(new URL(appRouteLinks.onbording, request.url));
  }

  if (!cookie?.value) {
    return NextResponse.rewrite(new URL(appRouteLinks.login, request.url));
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/pro/:path*", "/auth/login"],
};
