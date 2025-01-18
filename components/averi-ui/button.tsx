import { ButtonHTMLAttributes, DetailedHTMLProps } from "react";
import { cn } from "@/lib/utils";

type Props = DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>;

export default function Button({ children, className, ...props }: Props) {
  return (
    <button
      className={cn("self-start relative z-10 inline-flex min-h-[36px] cursor-pointer items-center justify-center border-0 bg-transparent px-3 pb-[0.3rem] text-base text-white before:absolute before:inset-0 before:-z-10 before:block before:rounded before:border before:border-white/20 before:bg-white/10 before:shadow-[0_4px_3px_0_rgba(0,0,0,0.2),inset_0_-5px_0_0_rgba(255,255,255,0.1)] before:content-[''] hover:before:border-white/30 hover:before:bg-white/20 hover:before:shadow-[0_4px_3px_0_rgba(0,0,0,0.2),inset_0_-5px_0_0_rgba(255,255,255,0.15)] focus:outline-none focus-visible:before:outline focus-visible:before:outline-4 focus-visible:before:outline-white/50 active:border-t-4 active:border-transparent active:py-1 active:before:shadow-none", className)}
      {...props}
    >
      {children}
    </button>
  )
}