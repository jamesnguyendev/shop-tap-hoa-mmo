import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith('/auth/sign-in') ||
    pathname.startsWith('/auth/sign-up');

  // ✅ Chưa đăng nhập → chỉ cho phép vào /auth/*
  if (!token && !isAuthPage) {
    const loginUrl = new URL('/auth/sign-in', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // ✅ Đã đăng nhập → không cho vào /auth/*
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  // ✅ Trường hợp hợp lệ → cho đi tiếp
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)']
};
