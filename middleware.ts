import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  // Note: auth verification is handled in layout.tsx and requireAdmin
  // so we don't block the edge middleware path with database queries.
  return NextResponse.next();
}

export const config = {
  matcher: [
    "/admin/:path*",
  ],
};
