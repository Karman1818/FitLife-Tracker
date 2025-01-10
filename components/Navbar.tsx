"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useSession } from "next-auth/react";

export default function Navbar() {
  const session = useSession();
  
  return (
    <nav className="w-full flex flex-row-reverse justify-between items-center py-2 px-4 bg-emerald-500">
      {session.data?.user ? (
        <Avatar>
          <AvatarImage src={session.data.user.image ?? ""}/>
          <AvatarFallback>{session.data.user.name?.split("").map(v => v[0]?.toUpperCase() ?? "").join("")}</AvatarFallback>
        </Avatar>
      ) : (
        <a href="/api/auth/signin" className="text-white">Sign in</a>
      )}
    </nav>
  );
}