"use client";
import {Button, ButtonProps} from "@heroui/react";
import React from "react";
import {cva} from "class-variance-authority";

export const buttonVariants = cva(
  "inline-flex items-center justify-center rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2",
  {
    variants: {
      kind: {
        primary: "bg-blue-600 text-white hover:bg-blue-700",
        secondary: "bg-gray-100 text-gray-700 hover:bg-gray-200",
        third: "bg-red-600 text-white hover:bg-red-700",
      },
      
    },
    defaultVariants: {
      kind: "primary",
    },
  }
);

export interface AppButtonProps extends ButtonProps {
    kind?: "primary" | "secondary" | "third";
}

export const AppButton = (props: AppButtonProps) => {
    return <Button {...props} className={buttonVariants({kind: props.kind})} />;
}