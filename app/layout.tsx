import "./globals.css";
import React from "react";
import Navbar from "@/components/Navbar";
import { sfProRounded } from "@/lib/fonts";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

type Props = Readonly<{ children: React.ReactNode; }>

export default async function RootLayout({ children }: Props) {
  const session = await auth();
  
  return (
    <html lang="en">
    <body className="antialiased">
    <SessionProvider session={session}>
      <main className={`flex flex-col h-full w-full ${sfProRounded.className}`}>
        <Navbar/>
        {children}
      </main>
    </SessionProvider>
    </body>
    </html>
  );
}
