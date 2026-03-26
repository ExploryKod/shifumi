"use client";

import { useElementHeightCssVar } from "@modules/app/react/hooks/useElementHeightCssVar";

export const Footer = () => {
  const { ref } = useElementHeightCssVar({
    cssVarName: "--footer-height",
    initialPx: 0,
    writeTo: "root",
  });
  const year = new Date().getFullYear();

  return (
    <footer ref={ref} className="w-full border-t border-black/10 bg-white">
      <div className="footer-container flex items-center justify-between gap-3 text-sm text-black/60">
        <p>© {year} CleanApp</p>
        <p>Built with Next.js</p>
      </div>
    </footer>
  );
};