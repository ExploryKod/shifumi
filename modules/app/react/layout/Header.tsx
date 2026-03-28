"use client";
import React from "react";
import Link from "next/link";
import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";
import Image from "next/image";
import { Scores } from "@/app/_components/Scores";

export const Header: React.FC<{ className?: string }> = ({ className = "" }) => {
  const { ref } = useElementHeightCssVar({
    cssVarName: "--header-height",
    initialPx: 0,
    writeTo: "root",
  });

  return (
    <header
      ref={ref}
      className="sticky top-0 z-20 w-full"
    >
      <div className="header-container">
        <div className="border-2 border-white/30 rounded-xl p-6 flex items-center justify-between">
          <div>
            <Link href="/" className="block">
              <Image src="/logo.svg" alt="Rock Paper Scissors" width={120} height={60} />
            </Link>
          </div>
          <div className="bg-white rounded-xl px-6 py-4">
            <div className="text-center">
              <p className="text-navy-900 text-sm font-semibold tracking-wider mb-1">SCORE</p>
              <p className="text-navy-900 text-4xl font-bold">
                <Scores />
              </p>
            </div>
          </div>
        </div>
      </div>
  
    </header>
  );
};
