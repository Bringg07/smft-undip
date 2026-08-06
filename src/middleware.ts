import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Middleware ringan: hanya memeriksa keberadaan cookie sesi untuk mencegah
 * akses tak perlu ke /admin. Validasi penuh (auth()) dilakukan di
 * src/app/admin/layout.tsx yang berjalan di Node runtime.
 *
 * Catatan: kita sengaja TIDAK mengimpor next-auth di sini karena library
 * jose di dalamnya memakai API Node (CompressionStream) yang tidak tersedia
 * di Edge Runtime middleware.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const sessionCookie =
    request.cookies.get("authjs.session-token")?.value ||
    request.cookies.get("__Secure-authjs.session-token")?.value;

  const isLoggedIn = Boolean(sessionCookie);

  // Lindungi halaman admin — arahkan ke halaman login
  if (pathname.startsWith("/admin") && pathname !== "/admin/login" && !isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  // User dengan cookie sesi tidak perlu melihat halaman login
  if (pathname === "/admin/login" && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }
}

export const config = {
  matcher: ["/admin/:path*"],
};
