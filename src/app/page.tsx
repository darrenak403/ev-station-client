// import Image from "next/image";
"use client";
import {ThemeToggle} from "@/components/modules/SwithTheme/theme-toggle";
import {MyButton} from "@/components/styled/Button/MyButton";

export default function Home() {
  return (
    <div>
      <div className="">
        <ThemeToggle  />
        <MyButton>Click me</MyButton>
      </div>
    </div>
  );
}
