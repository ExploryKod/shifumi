"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";

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
      className="sticky top-0 z-20 w-full border-b border-black/10 bg-white/90 backdrop-blur"
    >
      <nav
        className={`header-container flex items-center justify-between gap-4 ${className}`.trim()}
      >
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-black hover:text-black/70"
        >
          CleanApp
        </Link>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link
            href="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-black/70 transition hover:bg-black/5 hover:text-black focus:outline-none focus:ring-2 focus:ring-black/20"
          >
            Home
          </Link>
          <Link
            href="/login"
            className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
              isLoginActive
                ? "bg-black text-white"
                : "text-black/70 hover:bg-black/5 hover:text-black"
            }`}
          >
            Log in
          </Link>
          <Link
            href="/register"
            className={`rounded-md px-3 py-2 text-sm font-medium transition focus:outline-none focus:ring-2 focus:ring-black/20 ${
              isRegisterActive
                ? "bg-black text-white"
                : "text-black/70 hover:bg-black/5 hover:text-black"
            }`}
          >
            Register
          </Link>
        </div>
      </nav>
    </header>
  );
};
