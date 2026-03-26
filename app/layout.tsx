import { Rubik } from "next/font/google";
import "@/app/globals.css";
import { ThemeProvider } from "@modules/app/react/ThemeProvider";
import { Header } from "@modules/app/react/layout/Header";
import { Footer } from "@modules/app/react/layout/Footer";

const rubik = Rubik({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  display: "swap",
  variable: "--font-rubik",
  adjustFontFallback: true,
});

export const metadata = {
  title: "Auth-first Next.js Template",
  description: "Reusable template with authentication ready to extend.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${rubik.variable} overflow-x-hidden antialiased`}
      suppressHydrationWarning
    >
      <body className={`${rubik.className}`} suppressHydrationWarning>
        <ThemeProvider attribute="data-theme" defaultTheme="light" enableSystem={false}>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
