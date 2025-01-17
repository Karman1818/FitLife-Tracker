import "./globals.css";
import React from "react";
import Nav from "@/components/Nav";
import { SFProRounded } from "@/lib/fonts";
import { Metadata } from "next";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = Readonly<{ children: React.ReactNode; }>;

export const metadata = {
  other: {
    "link": "/ventura.webp",
  },
} satisfies Metadata;

export default async function Layout({ children }: Props) {
  const session = await auth();
  const dev = process.env.NODE_ENV !== "production";
  
  return (
    <html lang="en">
    <body className={`${dev ? "debug-screens" : ""} selection:bg-white/10 text-white/75`}>
    <SessionProvider session={session}>
      <Nav/>
      <main
        className="h-full w-full bg-[url('/Elarun.webp')] bg-cover bg-center bg-origin-border overflow-x-hidden pt-[3.25rem]"
        style={SFProRounded.style}
      >
        {children}
      </main>
    </SessionProvider>
    </body>
    </html>
  );
}
