import { NextResponse, type NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  const token = await getToken({ req, secret: process.env.NEXTAUTH_URL });

  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/_next/") || pathname.includes(".")) {
    // static files
    return;
  }

  if (pathname.includes("/api/auth") || token) {
    return NextResponse.next();
  }

  if (!token && pathname !== "/login") {
        url.pathname = "/login";
 return NextResponse.rewrite(new URL('/', req.url))  }
}
