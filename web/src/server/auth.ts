import {
  getServerSession,
  type DefaultSession,
  type NextAuthOptions,
} from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { api } from "@/trpc/server";

/**
 * Module augmentation for `next-auth` types.
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: ILoginReturn & DefaultSession["user"];
  }

  interface User extends ILoginReturn {}
}

declare module "next-auth/jwt" {
  interface JWT {
    user: IUser;
    accessToken: string;
  }
}

export const authOptions: NextAuthOptions = {
  callbacks: {
    async jwt({ token, account, user }) {
      if (account && account.type === "credentials") {
        const { user: userData } = user;
        token.user = userData;
        token.accessToken = user.token;
      }

      return token;
    },
    session: ({ session, token }) => {
      session.user.user = token.user;
      session.user.token = token.accessToken;

      return session;
    },
  },
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: { label: "Email", placeholder: "Enter email", type: "text" },
        password: {
          label: "Password",
          placeholder: "Enter password",
          type: "password",
        },
      },

      async authorize(credentials, req): Promise<any> {
        const { email, password } = credentials as {
          email: string;
          password: string;
        };

        const user = await api.auth.login.mutate({ email, password });

        return user;
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export const getServerAuthSession = () => getServerSession(authOptions);
