// hero.ts
"use client";
import {heroui} from "@heroui/react";
export default heroui({
  themes: {
    light: {
      colors: {
        primary: "#0070f3",
        secondary: "#1c1c1e",
      },
    },
    dark: {
      colors: {
        primary: "#1c1c1e",
        secondary: "#f5f5f5",
      },
    },
  },
});
