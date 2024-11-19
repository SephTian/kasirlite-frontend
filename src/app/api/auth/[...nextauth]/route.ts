import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import api from '@/services/api';
import { UserSession } from '@/types';
import { AxiosError } from 'axios';
import { verifyJwt } from '@/utils/jwt';

declare module 'next-auth' {
  interface User {
    accessToken: string;
    accessTokenExpires: number;
    name: string;
    email: string;
    role: string;
  }

  interface Session {
    user: UserSession;
  }
}

const EXP_JWT_NEXT_AUTH = 60 * 60 * 24 * 7; // 1 minggu

const authOptions: NextAuthOptions = {
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
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
        token.name = user.name;
        token.email = user.email;
        token.role = user.role;
        const decodedJWT = await verifyJwt(user.accessToken, process.env.SECRET_KEY || '');
        token.accessTokenExpires = decodedJWT.exp;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = {
          ...session.user,
          accessToken: token.accessToken as string,
          accessTokenExpires: token.accessTokenExpires as number,
          email: token.email as string,
          name: token.name as string,
          role: token.role as string,
        };
      }
      return session;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
