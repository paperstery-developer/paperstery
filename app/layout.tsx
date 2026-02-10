import type { Metadata } from "next";

import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

import { marble, nobelUno } from "./fonts";

import "./globals.css";
import { FAQ } from "@/components/shared/FAQ";
import ResponsiveBlocker from "@/components/responsive-blocker";

export const metadata: Metadata = {
  title: "Paperstery | Professional Book Publishing House",
  description:
    "Paperstery is an independent publishing company helping creatives, professionals, and organizations produce world-class books and legacies.",
  keywords: [
    "independent publishing",
    "book editing services",
    "manuscript development",
    "academic publishing",
    "corporate reports",
    "Nigeria publishing",
    "US publishing company",
  ],
  icons: {
    icon: "/icon.png",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${marble.variable} ${nobelUno.variable} antialiased`}
        suppressHydrationWarning
      >
        <ResponsiveBlocker />
        <Header />
        {children}
        <FAQ />
        <Footer />
      </body>
    </html>
  );
}
