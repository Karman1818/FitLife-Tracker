"use client";

import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { GiMeal } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import { GiForkKnifeSpoon } from "react-icons/gi";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Nav() {
  const session = useSession();
  
  function getInitials(user: Extract<typeof session, { status: "authenticated" }>["data"]["user"] | null) {
    if(!user) return "?";
    let strings: string[] = ["?"];
    if(user.name) {
      strings = user.name.split(" ");
    } else if(user.email) {
      strings = user.email!.split("@")[0].split(/_-/g);
    }
    return strings.map(v => v[0]?.toUpperCase()).filter(Boolean).join("");
  }
  
  return (
    <nav
      className="fixed top-0 flex flex-row w-[calc(100%-0.5rem)] z-50 py-2 px-3 m-1 bg-gradient-to-r from-white/15 via-white/10 to-white/15 backdrop-blur-md rounded-md space-x-3 transition-all duration-300 justify-between"
    >
      <Link
        href="/"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <GrHomeRounded className="w-6 h-6"/>
        <p className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100">Home</p>
      </Link>
      <Link
        href="/calories"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <GiMeal className="w-6 h-6"/>
        <p className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100">Calories</p>
      </Link>
      <Link
        href="/bmi"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <FaWeight className="w-6 h-6"/>
        <p className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100">BMI</p>
      </Link>
      <Link
        href="/meals"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <GiForkKnifeSpoon className="w-6 h-6"/>
        <p className="w-0 opacity-0 group-hover:w-auto group-hover:opacity-100">Meals</p>
      </Link>
      {!!session.data?.user && (
        <Avatar className="text-black">
          <AvatarImage src={session.data.user.image ?? ""}/>
          <AvatarFallback>{getInitials(session.data.user)}</AvatarFallback>
        </Avatar>
      )}
    </nav>
  );
}