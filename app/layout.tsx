import "./globals.css";
import React from "react";
import Nav from "@/components/Nav";
import { SFProRounded } from "@/lib/fonts";
import { Metadata } from "next";

type Props = Readonly<{ children: React.ReactNode; }>;

export const metadata = {
  other: {
    "link": "/ventura.webp",
  },
} satisfies Metadata;

export default function({ children }: Props) {
  const dev = process.env.NODE_ENV !== "production";
  
  return (
    <html lang="en">
    <body className={dev ? "debug-screens" : ""}>
    <main
      className="h-full w-full flex flex-col sm:flex-row selection:bg-white/10 text-white/75 bg-[url('/Elarun.webp')] bg-cover bg-center bg-origin-border overflow-x-hidden"
      style={SFProRounded.style}
    >
      <Nav/>
      {children}
    </main>
    </body>
    </html>
  );
}
