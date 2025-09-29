"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useContext } from "react";

export const useCreateUserDisclosureCore = () => {
  return useDisclosure();
};

export const useCreateUserDisclosureSingleton = () => {
  const { useCreateUserDisclosure } = useContext(DiscloresuresContext)!;
  return useCreateUserDisclosure;
};
