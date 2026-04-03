import type { Metadata } from "next";
import { Toaster } from "@/components/ui/sonner";
import QueryProvider from "@/components/providers/QueryProvider";

import { marble, nobelUno } from "./fonts";

import "./globals.css";
// import ResponsiveBlocker from "@/components/responsive-blocker";

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
  },
  openGraph: {
    title: "Paperstery | Dare Your Dreams. Publish With Us",
    description:
      "Transform your ideas into world-class books. Publishing support for creatives, professionals, and organizations.",
    url: "https://paperstery.com",
    siteName: "Paperstery",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Paperstery | Professional Book Publishing House",
    description: "Dare your dreams. Publish with Paperstery.",
    images: ["./opengraph-image.jpg"],
  },
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
        <QueryProvider>
          {/* <ResponsiveBlocker /> */}
          {children}
          <Toaster richColors position="top-right" />
        </QueryProvider>
      </body>
    </html>
  );
}
