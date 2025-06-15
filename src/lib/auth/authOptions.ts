import { LoginResponse, TokenPayload } from '@/lib/types';
import { postRequest } from '@/utils/apiClient';
import { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { jwtDecode } from 'jwt-decode';
import KeycloakProvider from 'next-auth/providers/keycloak';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials) return null;
        try {
          const baseUrl =
            process.env.NODE_ENV === 'production'
              ? process.env.NEXT_PUBLIC_URL
              : process.env.NEXTAUTH_URL;

          const user = await postRequest<LoginResponse>(
            `${baseUrl}/api/login`,
            {
              email: credentials?.email,
              password: credentials?.password
            }
          );

          if (user?.access_token) {
            return {
              ...user,
              id: user?.sub || credentials?.email
            };
          }

          return null;
        } catch (error) {
          console.log('Error during authorization:', error);
          return null;
        }
      }
    }),
    KeycloakProvider({
      clientId: process.env.KEYCLOAK_CLIENT_ID!,
      clientSecret: process.env.KEYCLOAK_CLIENT_SECRET!,
      issuer: process.env.KEYCLOAK_ISSUER!,
      idToken: true,
      authorization: {
        params: {
          kc_idp_hint: 'google',
          prompt: 'select_account'
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user, account }) {
      if (account?.provider === 'keycloak') {
        token.accessToken = account.access_token;
        token.provider = account.provider;
        token.idToken = account.id_token;
        try {
          const decoded = jwtDecode<TokenPayload>(
            account.access_token as string
          );
          token.user = {
            name: decoded.name || '',
            email: decoded.email || ''
          };
        } catch (error) {
          console.error('Failed to decode access token google:', error);
          token.user = {
            name: user.name || '',
            email: user.email || ''
          };
        }
      }
      if (user?.access_token) {
        token.accessToken = user.access_token;
        token.id = user.id;

        try {
          const decoded = jwtDecode<TokenPayload>(user.access_token as string);
          token.user = {
            name: decoded.name || '',
            email: decoded.email || ''
          };
        } catch (error) {
          console.error('Failed to decode access token:', error);
          token.user = {
            name: user.name || '',
            email: user.email || ''
          };
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user = token.user;
        session.accessToken = token.accessToken;
        session.provider = token.provider;
        session.idToken = token.idToken;
        session.expires = session.expires;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/sign-in'
  }
};
