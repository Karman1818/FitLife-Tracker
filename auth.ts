import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";
import Resend from "@auth/core/providers/resend";
import { env } from "@/lib/env";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    Resend({
      from: env.EMAIL_FROM,
    }),
  ],
  theme: {
    colorScheme: "dark",
    brandColor: "#9900ff",
  },
});