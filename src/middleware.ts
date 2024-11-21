import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { verifyJwt } from './utils/jwt';

const protectedURL = ['/', '/setting'];

export async function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const token = await getToken({
    req: request,
    secret: process.env.SECRET_KEY,
  });

  // Pengecekan token untuk autentikasi, jika ridak ada token (nextauth atau accesstoken), maka akan tebuang ke login page
  if (protectedURL.includes(request.nextUrl.pathname) && !token) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  if (token && token.accessToken) {
    const decodedJWT = await verifyJwt(token?.accessToken as string, process.env.SECRET_KEY || '');
    const tokenExpInMs = (decodedJWT.exp as number) * 1000;

    // Pengecekan sudah login tapi expire
    if (protectedURL.includes(request.nextUrl.pathname) && Date.now() > tokenExpInMs) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // jika sudah login dan access token belum expire, maka dilarang untuk ke halaman login
    if (request.nextUrl.pathname === '/login' && Date.now() < tokenExpInMs) {
      return NextResponse.redirect(new URL('/', request.url));
    }
  }

  return response;
}

// export const config = {
//   matcher: ['/', '/login'],
// };
