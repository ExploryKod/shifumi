import { Barlow_Semi_Condensed } from "next/font/google";
import type { Viewport } from "next";
import "@/app/globals.css";
import { AppWrapper } from "@modules/app/react/appWrapper";


const barlowSemiCondensed = Barlow_Semi_Condensed({
  subsets: ["latin"],
  weight: ["600", "700"],
  display: "swap",
  variable: "--font-barlow",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Rock Paper Scissors - Play the Classic Game Online",
  description: "Play Rock Paper Scissors against the computer! Classic and bonus modes with Lizard and Spock. Responsive design, score tracking, and smooth gameplay experience.",
  keywords: "rock paper scissors, online game, classic game, lizard spock, browser game, responsive game",
  authors: [{ name: "Frontend Mentor Challenge" }],
  creator: "Frontend Mentor",
  publisher: "Frontend Mentor",
  robots: "index, follow",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "Rock Paper Scissors - Play Online",
    description: "Challenge the computer in this classic Rock Paper Scissors game. Features both classic and bonus modes with beautiful responsive design.",
    siteName: "Rock Paper Scissors Game",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Rock Paper Scissors Game Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Rock Paper Scissors - Play Online",
    description: "Challenge the computer in this classic game with beautiful responsive design.",
    images: ["/og-image.jpg"],
  },
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
    ],
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "hsl(214, 47%, 23%)" },
    { media: "(prefers-color-scheme: dark)", color: "hsl(237, 48%, 15%)" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${barlowSemiCondensed.variable} overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className={`${barlowSemiCondensed.className}`} suppressHydrationWarning>
        <AppWrapper>
          {children}
        </AppWrapper>
      </body>
    </html>
  );
}
