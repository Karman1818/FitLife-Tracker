import NextAuth from "next-auth";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [],
  theme: {
    colorScheme: "dark",
    brandColor: "#9900ff",
  }
});