import { NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith('/auth/sign-in') ||
    pathname.startsWith('/auth/sign-up');

  const loginTimeCookie = req.cookies.get('loginTime')?.value;
  const loginTime = loginTimeCookie ? parseInt(loginTimeCookie, 10) : 0;
  const TWO_HOURS = 2 * 60 *  60 * 1000;

  const now = Date.now();
  const isExpired = now - loginTime >= TWO_HOURS;

  //   Không có token và không ở trang auth
  if (!token && !isAuthPage) {
    const loginUrl = new URL('/auth/sign-in', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    return NextResponse.redirect(loginUrl);
  }

  //   Có token nhưng loginTime hết hạn
  if (token && isExpired) {
    const logoutUrl = new URL('/auth/sign-out', req.url);
    return NextResponse.redirect(logoutUrl);
  }

  //   Đã login mà đang ở trang login
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|auth/|images/|api/).*)']
};
