"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useContext } from "react";

export const useViewUserByIdDisclosureCore = () => {
  return useDisclosure();
};

export const useViewUserByIdDisclosureSingleton = () => {
  const { useViewUserByIdDisclosure } = useContext(DiscloresuresContext)!;
  return useViewUserByIdDisclosure;
};
