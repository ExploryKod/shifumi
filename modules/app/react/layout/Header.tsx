"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";
import Image from "next/image";
import { Scores } from "@/app/_components/Scores";

export const Header: React.FC<{ className?: string }> = ({ className = "" }) => {
  const pathname = usePathname();
  const { ref } = useElementHeightCssVar({
    cssVarName: "--header-height",
    initialPx: 0,
    writeTo: "root",
  });

  const isLoginActive = pathname === "/login";
  const isRegisterActive = pathname === "/register";

  return (
    <header
      ref={ref}
      className="sticky top-0 z-20 w-full"
    >
      <div className="header-container">
       {/*
      <nav
        className={`bg-transparent flex items-center justify-between gap-4 ${className}`.trim()}
        aria-label="Authentication links"
      >
        <div className="flex items-center gap-2 sm:gap-3">
          <Link 
            href="/login"
            className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
              isLoginActive
                ? "bg-black text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/register"  
            className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
              isRegisterActive
                ? "bg-black text-white"
                : "text-white/70 hover:bg-white/5 hover:text-white"
            }`}
          >
            Register
          </Link>
        </div>
      </nav>
      */}
      <nav className="border-3 border-navy-900 rounded-lg p-4 flex items-center justify-between gap-4">
        <div>
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-white hover:text-navy-900/70"
        >
          <Image src="/logo.svg" alt="Rock Paper Scissors Logo" width={100} height={100} />
        </Link>
        </div>
        <div>
          <Scores />
        </div>
      </nav>
      </div>
  
    </header>
  );
};
