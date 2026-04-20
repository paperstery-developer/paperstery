import React from "react";

export const metadata = {
  title: "Terms of Service | Paperstery",
  description:
    "Read the terms governing the use of Paperstery Limited's website and publishing services.",
};

export default function Layout({children}: {children: React.ReactNode}) {
    return (
        <>{children}</>
    )
}