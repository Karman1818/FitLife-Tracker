"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GiMeal, GiForkKnifeSpoon } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";
import { useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "@/components/icons/logo";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { href: "/calories", label: "Calories", icon: GiMeal },
  { href: "/bmi", label: "BMI", icon: FaWeight },
  { href: "/meals", label: "Meals", icon: GiForkKnifeSpoon },
];

export default function Nav() {
  const pathname = usePathname();
  const session = useSession();

  function getInitials(user: Extract<typeof session, { status: "authenticated" }>["data"]["user"] | null) {
    let strings: string[] = ["?"];
    if (user?.name) {
      strings = user.name.split(" ");
    } else if (user?.email) {
      strings = user.email.split("@")[0].split(/_-/g);
    }
    return strings.map((v) => v[0]?.toUpperCase()).filter(Boolean).join("");
  }

  const isHomeActive = pathname === "/";

  return (
    <nav className="fixed top-1.5 left-1.5 right-1.5 z-50 py-1.5 px-3 sm:px-4 bg-gradient-to-r from-white/15 via-white/10 to-white/15 backdrop-blur-xl border border-white/15 rounded-xl shadow-[0_8px_30px_rgb(0,0,0,0.12)] flex items-center justify-between transition-all duration-300">
      {/* Brand logo & title */}
      <Link
        href="/"
        className={cn(
          "flex items-center gap-2.5 py-1.5 px-3 rounded-lg transition-all duration-200 group border",
          isHomeActive
            ? "bg-white/20 text-white border-white/25 shadow-[0_2px_10px_rgba(255,255,255,0.12)] font-semibold"
            : "text-white/85 hover:text-white hover:bg-white/10 border-transparent hover:border-white/15 hover:scale-[1.02]"
        )}
      >
        <Logo className="w-6 h-6 transition-transform duration-300 group-hover:scale-110 group-hover:-rotate-3 drop-shadow" />
        <span className="font-bold tracking-tight text-sm sm:text-base whitespace-nowrap">
          FitLife Tracker
        </span>
      </Link>

      {/* Main navigation links */}
      <div className="flex items-center gap-1 sm:gap-2">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href || (href !== "/" && pathname?.startsWith(href));
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                "flex items-center gap-2 py-1.5 px-2.5 sm:px-3.5 rounded-lg text-sm font-medium transition-all duration-200 group border",
                isActive
                  ? "bg-white/20 text-white border-white/25 shadow-[0_2px_10px_rgba(255,255,255,0.15)] font-semibold backdrop-blur-md"
                  : "text-white/75 hover:text-white hover:bg-white/10 border-transparent hover:border-white/15 hover:scale-[1.03] active:scale-[0.98]"
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-transform duration-200 group-hover:scale-115",
                  isActive ? "text-green-400" : "text-white/80 group-hover:text-green-300"
                )}
              />
              <span className="whitespace-nowrap tracking-wide">{label}</span>
            </Link>
          );
        })}
      </div>

      {/* User Session Avatar */}
      {!!session.data?.user && (
        <Avatar className="text-black h-8 w-8 ring-2 ring-white/20 transition-transform hover:scale-105">
          <AvatarImage src={session.data.user.image ?? ""} />
          <AvatarFallback className="text-xs font-semibold bg-white/30 text-white">
            {getInitials(session.data.user)}
          </AvatarFallback>
        </Avatar>
      )}
    </nav>
  );
}
