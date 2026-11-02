import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";

import connectDB from "@/lib/mongodb";
import User from "@/models/User";
import { verifyPassword } from "@/lib/password";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1),
});

export const { handlers, auth, signIn, signOut } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google,

    Credentials({
      name: "Email and Password",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "you@example.com",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        // Validate the submitted credentials
        const parsed = loginSchema.safeParse(credentials);

        if (!parsed.success) {
          return null;
        }

        const { email, password } = parsed.data;

        await connectDB();

        // Password hashes are hidden by default
        const user = await User.findOne({
          email: email.trim().toLowerCase(),
        }).select("+passwordHash");

        if (!user || !user.passwordHash) {
          return null;
        }

        // Compare the submitted password with its hash
        const isValidPassword = await verifyPassword(
          password,
          user.passwordHash,
        );

        if (!isValidPassword) {
          return null;
        }

        // Auth.js uses this information to create a session
        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? null,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
  },
});
