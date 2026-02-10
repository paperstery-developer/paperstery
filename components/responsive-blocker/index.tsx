"use client";

import Image from "next/image";
import { useState, useEffect } from "react";

import loadingImage from "@/assets/gifs/loading.gif";
import Logo from "@/components/shared/Logo";

const ResponsiveBlocker = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setIsLoading(false);
    const checkWidth = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  if (!isLoading)
    return (
      <div>
        <div className="fixed inset-0 z-999 flex flex-col items-center justify-center bg-white p-6 text-center">
          <div className="flex items-center justify-center mb-4">
            <Image src={loadingImage} alt="Loading..." unoptimized />
          </div>
        </div>
      </div>
    );
  if (!isMobile) return null;

  return (
    <div className="fixed inset-0 z-9999 flex flex-col items-center justify-center bg-white p-6 text-center">
      <div className="max-w-md space-y-4">
        <div className="flex items-center justify-center mb-4">
          <Logo />
        </div>
        <h2 className="text-2xl font-bold text-gray-900">
          Best viewed on a larger screen
        </h2>
        <p className="text-gray-600">
          Our mobile experience is currently under construction. Please switch
          to a laptop or tablet for the best experience.
        </p>
        <div className="mt-4 inline-block rounded-lg bg-primary px-4 py-2 text-sm font-medium text-white">
          Paperstery — Coming Soon to Mobile
        </div>
      </div>
    </div>
  );
};

export default ResponsiveBlocker;
