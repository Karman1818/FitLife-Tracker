import "./globals.css";
import React from "react";
import Nav from "@/components/Nav";

type Props = Readonly<{ children: React.ReactNode; }>;

export default function RootLayout({ children }: Props) {
  const dev = process.env.NODE_ENV !== "production";
  
  return (
    <html lang="en">
    <body className={dev ? "debug-screens" : ""}>
    <main className="h-full w-full flex flex-col sm:flex-row bg-gradient-to-br from-indigo-700 via-purple-700 to-pink-700">
      <Nav/>
      {children}
    </main>
    </body>
    </html>
  );
}
