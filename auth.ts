import NextAuth from "next-auth";
import Resend from "@auth/core/providers/resend";
import { D1Adapter } from "@auth/d1-adapter";
import env from "@/lib/env";
import { Provider } from "@auth/core/providers";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: D1Adapter(env.db),
  providers: [
    Resend({
      from: env.email_from,
    })
  ],
  theme: {
    colorScheme: "dark",
    brandColor: "#9900ff",
  }
});