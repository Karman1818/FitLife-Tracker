import Link from "next/link";
import { GrHomeRounded } from "react-icons/gr";
import { GiMeal } from "react-icons/gi";
import { FaWeight } from "react-icons/fa";

export default function() {
  return (
    <nav
      className="flex flex-row sm:flex-col max-sm:w-[calc(100%-0.5rem)] sm:h-[calc(100%-0.5rem)] z-50 py-2 sm:py-2 px-3 sm:px-1.5 m-1 bg-gradient-to-r sm:bg-gradient-to-b from-white/15 via-white/10 to-white/15 backdrop-blur-md rounded-md max-sm:space-x-3 sm:space-y-1 text-white transition-all duration-300"
    >
      <Link
        href="/"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <GrHomeRounded className="w-6 h-6"/>
        <p className="max-sm:w-0 max-sm:opacity-0 group-hover:w-auto group-hover:opacity-100">Home</p>
      </Link>
      <Link
        href="/calories"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <GiMeal className="w-6 h-6"/>
        <p className="max-sm:w-0 max-sm:opacity-0 group-hover:w-auto group-hover:opacity-100">Meals</p>
      </Link>
      <Link
        href="/bmi"
        className="flex flex-row items-center gap-4 transition-all duration-300 group hover:bg-white/5 hover:gap-2 py-1 px-2 hover:pr-4 rounded-md"
      >
        <FaWeight className="w-6 h-6"/>
        <p className="max-sm:w-0 max-sm:opacity-0 group-hover:w-auto group-hover:opacity-100">BMI</p>
      </Link>
    </nav>
  );
}