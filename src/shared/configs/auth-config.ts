import { NextAuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { authorizeSuperAdmin, fetchLoginSa } from "@/features/sign-in/api/api";
import { Path } from "@/shared/const/path";

export const authConfigs: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: "credentials",
      credentials: {
        email: {},
        password: {},
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }
        try {
          const data = await authorizeSuperAdmin({
            email: credentials.email,
            password: credentials.password,
          });

          if (data.length === 0) {
            return null;
          }

          return {
            id: "some-id",
            email: credentials.email,
            token: data,
          };
        } catch (error) {
          return Promise.reject(error);
        }
      },
    }),
  ],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        return {
          ...token,
          token: user.token || token.token,
        };
      }

      if (Date.now() < (token.accessTokenExpires as number)) {
        return token;
      }

      try {
        const data = fetchLoginSa(token.token);

        if (!data) {
          return {
            ...token,
            error: "RefreshAccessTokenError",
            token: "",
          };
        }

        return {
          ...token,
          accessTokenExpires: Date.now() + 30 * 24 * 60 * 60 * 1000,
        };
      } catch (error) {
        console.log(error);

        return {
          ...token,
          error: "RefreshAccessTokenError",
          token: "",
        };
      }
    },

    async session({ session, token }) {
      return {
        ...session,
        token: token.token,
        accessTokenExpires: token.accessTokenExpires,
        error: token.error,
      };
    },
  },

  pages: {
    signIn: Path.Auth.SignIn,
  },
};
