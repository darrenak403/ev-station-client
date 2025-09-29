"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useContext } from "react";

export const useUpdateUserDisclosureCore = () => {
  return useDisclosure();
};

export const useUpdateUserDisclosureSingleton = () => {
  const { useUpdateUserDisclosure } = useContext(DiscloresuresContext)!;
  return useUpdateUserDisclosure;
};
