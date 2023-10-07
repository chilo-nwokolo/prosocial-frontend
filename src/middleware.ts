import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { appRouteLinks } from './utils/constants'
 
// This function can be marked `async` if using `await` inside
export function middleware(request: NextRequest) {
  let cookie = request.cookies.get("accessToken");
  if (!cookie?.value) {
    return NextResponse.redirect(new URL(appRouteLinks.login, request.url))
  }
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher: '/pro/:path*',
}