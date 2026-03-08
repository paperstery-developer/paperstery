import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

import "../globals.css";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <div>
        <Header />
        {children}
        <Footer />
      </div>
  );
}
