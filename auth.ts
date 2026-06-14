import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { db } from "./app/db";
import { eq } from "drizzle-orm";
import { users } from "./app/db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      credentials: {
        email: {
          type: "text",
          label: "Username",
          placeholder: "johndoe",
        },
        password: {
          type: "password",
          label: "Password",
          placeholder: "*****",
        },
      },
      authorize: async (credentials) => {
        if (!credentials.email || !credentials.password) {
          return null;
        }

        const user = await db.query.users.findFirst({
          where: eq(users.username, String(credentials.email)),
        });

        if (!user) {
          return null;
        }

        const isValid = await bcrypt.compare(
          String(credentials?.password),
          user?.passwordHash,
        );

        if (!isValid) {
          return null;
        }

        return {
          id: String(user.id),
          name: user.name,
          email: user.username,
        };
      },
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
