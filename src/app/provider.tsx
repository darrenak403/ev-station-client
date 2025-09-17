// app/providers.tsx
"use client";
import React from "react";
import {HeroUIProvider} from "@heroui/react";
import {ThemeProvider} from "next-themes";

export function Providers({children}: {children: React.ReactNode}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>{children}</HeroUIProvider>
    </ThemeProvider>
  );
}
