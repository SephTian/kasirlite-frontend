import NextAuth, { DefaultSession, NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UserSession } from '@/lib/types';
import { AxiosError } from 'axios';
import { verifyJwt } from '@/utils/jwt';
import api from '@/lib/services/api';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    name: string;
    email: string;
    role: string;
  }

  interface Session extends DefaultSession {
    user: UserSession;
    accessToken: string;
  }
}

const EXP_JWT_NEXT_AUTH = 24 * 60 * 60; // 1 hari

export const authOptions: NextAuthOptions = {
  session: {
    strategy: 'jwt',
    maxAge: EXP_JWT_NEXT_AUTH,
  },
  secret: process.env.SECRET_KEY,
  pages: {
    signIn: '/',
  },
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      type: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email dan Password dibutuhkan');
        }

        try {
          const user = await api.login({
            email: credentials.email,
            password: credentials.password,
          });

          if (!user) {
            throw new Error('Email atau Password salah');
          }

          return user;
        } catch (error) {
          if (error instanceof AxiosError) {
            throw new Error(error.response?.data?.message || 'Login failed');
          }
        }
      },
    }),
  ],
  callbacks: {
    /**
     * Fungsi ini akan terpanggil saat
     * 1. saat login berhasil
     * 2. Saat Token / Session Dibutuhkan (getToken, getSession, getServerSession, useSession)
     * 4. Ketika Token Kadaluarsa atau Perlu Refresh
     */
    async jwt({ token, user, account }) {
      if (token.accessToken) {
        const decodedJWT = await verifyJwt(token.accessToken as string, process.env.SECRET_KEY || '');
        token.accessTokenExpires = (decodedJWT?.exp || 0) * 1000;
      }

      if (account && user) {
        console.log('hi ini aku saat setelah login');
        return {
          ...token,
          user: {
            name: user.name,
            email: user.email,
            role: user.role,
          },
          accessToken: user.accessToken,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        console.log('**** returning previous token ******');
        //return token;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session = {
          ...session,
          ...token,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
