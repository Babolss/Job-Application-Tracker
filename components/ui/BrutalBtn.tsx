"use client";

import type { ReactNode } from "react";
import { useState } from "react";
import { cn } from "@/lib/utils";

export type BrutalBtnProps = {
  type?: "button" | "submit" | "reset";
  children: ReactNode;
  onClick?: () => void;
  color?: string;
  fg?: string;
  full?: boolean;
  s?: string;
  disabled?: boolean;
};

export function BrutalBtn({
  type = "button",
  children,
  onClick,
  disabled = false,
  color = "bg-yellow-400",
  fg = "text-black",
  full = false,
  s = "",
}: BrutalBtnProps) {
  const [hov, setHov] = useState(false);

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={cn(
        "inline-flex items-center justify-center gap-1.5 border-2 border-black px-5 py-2 text-sm font-extrabold uppercase tracking-wider transition-all duration-100",
        "shadow-[4px_4px_0_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 hover:shadow-[2px_2px_0_0_#000]",
        "active:translate-x-0.5 active:translate-y-0.5 active:shadow-[2px_2px_0_0_#000]",
        "disabled:cursor-not-allowed disabled:opacity-60",
        full && "w-full",
        color,
        fg,
        s,
        hov && "translate-x-0.5 translate-y-0.5 shadow-[2px_2px_0_0_#000]"
      )}
    >
      {children}
    </button>
  );
}
