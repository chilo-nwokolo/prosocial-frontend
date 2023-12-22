import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { AccessToken, adminRoutes, appRouteLinks } from "./utils/constants";

// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(AccessToken);

  if (request.nextUrl.pathname.startsWith("/pro-admin")) {
    const userType = request.cookies.get("userType");

    if (userType?.value !== "admin" || !accessToken?.value) {
      return NextResponse.rewrite(new URL(adminRoutes.login, request.url));
    }

    return NextResponse.next();
  }

  if (
    request.nextUrl.pathname.startsWith("/auth") ||
    request.nextUrl.pathname.startsWith("/pro")
  ) {
    if (
      accessToken?.value &&
      request.nextUrl.pathname === appRouteLinks.login
    ) {
      return NextResponse.rewrite(
        new URL(appRouteLinks.onbording, request.url),
      );
    }

    if (!accessToken?.value) {
      return NextResponse.rewrite(new URL(appRouteLinks.login, request.url));
    }
    return NextResponse.next();
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/pro/:path*", "/auth/login", "/pro-admin/:path*"],
};
