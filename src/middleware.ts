import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

const protectedURL = ['/'];

export async function middleware(request: NextRequest) {
  try {
    const response = NextResponse.next();
    const token = await getToken({
      req: request,
      secret: process.env.SECRET_KEY,
    });

    // Pengecekan token untuk autentikasi, jika token (nextauth atau accesstoken) expire, maka akan tebuang ke login page
    if (protectedURL.includes(request.nextUrl.pathname) && (!token || !token?.accessTokenExpires || (token.accessTokenExpires as number) * 1000 < Date.now())) {
      return NextResponse.redirect(new URL('/login', request.url));
    }

    // jika sudah login, maka dilarang untuk ke halaman login
    if (request.nextUrl.pathname === '/login' && token) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  } catch (error) {
    console.error('Error in middleware:', error);
    return NextResponse.redirect(new URL('/login', request.url));
  }
}

// export const config = {
//   matcher: ['/', '/login'],
// };
