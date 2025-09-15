// import Image from "next/image";
"use client";
import {ThemeToggle} from "@/components/modules/SwithTheme/theme-toggle";

export default function Home() {
  return (
    <div>
      <div className="fixed top-4 right-4 z-50">
        <ThemeToggle />
      </div>
    </div>
  );
}
