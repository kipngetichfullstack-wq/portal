import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import { db } from "./db";
import { users } from "./schema";
import { eq } from "drizzle-orm";
import { z } from "zod";
import bcrypt from "bcryptjs";

const CredentialsSchema = z.object({
    email: z.string(),
    password: z.string(),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
    adapter: DrizzleAdapter(db),
    providers: [
        GitHub({
        clientId: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
        Google({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        Credentials({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Password", type: "password" },
            },
            async authorize(credentials) {
                const parsed = CredentialsSchema.safeParse(credentials);
                if (!parsed.success) {
                    throw new Error("Invalid credentials");
                }
                const { email, password } = parsed.data;
                const userResult = await db.select().from(users).where(eq(users.email, email)).limit(1);

                const user = userResult[0];
                if (!user) {
                    throw new Error("Invalid credentials");
                }

                const isValidPassword = await verifyPassword(password, user.password!);
                if (!isValidPassword) {
                    throw new Error("Invalid credentials");
                }
                return {
                    id: String(user.id),
                    email: user.email,
                    name: user.name,
                    role: user.role,
                    company: user.company,
                    phone: user.phone,
                };            
            }
        })
    ],
    session: {
        strategy: "database",
        maxAge: 30 * 24 * 60 * 60, // 30 days
    },
    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.role = (user as any).role || "client";
                token.company = (user as any).company;
                token.phone = (user as any).phone;
            }
            return token;
        },
        async session({ session, token }) {
            if (token.id) {
                session.user.id = token.id as string;
                session.user.role = token.role as string;
                session.user.company = token.company as string;
                session.user.phone = token.phone as string;
            }
            return session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
});

const verifyPassword = (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
}