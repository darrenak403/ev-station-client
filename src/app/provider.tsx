// app/providers.tsx
"use client";

import React from "react";
import { HeroUIProvider } from "@heroui/react";
import { ThemeProvider } from "next-themes";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { SwrProvider } from "@/hook";
import ReduxProvider from "@/redux/Provider";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <HeroUIProvider>
        <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!}>
          <ReduxProvider> 
            <SwrProvider>
              {children}
            </SwrProvider>
          </ReduxProvider>
        </GoogleOAuthProvider>
      </HeroUIProvider>
    </ThemeProvider>
  );
}
