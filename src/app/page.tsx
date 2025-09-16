// import Image from "next/image";
"use client";
import {ThemeToggle} from "@/components/modules/SwithTheme/theme-toggle";
import {ToolTipTile} from "@/components/modules/Tooltip/Tooltip";
import {MyButton} from "@/components/styled/Button/MyButton";

export default function Home() {
  return (
    <div>
      <div className="">
        <ThemeToggle />
        <MyButton>Click meáhdsaldhas</MyButton>
        <ToolTipTile title="Info" tooltip="This is a tooltip" size="md" />
      </div>
    </div>
  );
}
