import { getToken } from 'next-auth/jwt';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(req: NextRequest) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  const isAuthPage =
    pathname.startsWith('/auth/sign-in') ||
    pathname.startsWith('/auth/sign-up');

  if (!token && !isAuthPage) {
    const loginUrl = new URL('/auth/sign-in', req.url);
    loginUrl.searchParams.set('callbackUrl', pathname);
    loginUrl.searchParams.set('from', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/|favicon.ico|auth/|images/|api/).*)']
};
