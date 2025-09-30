"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useContext } from "react";

export const useCreateIDCardDisclosureCore = () => {
  return useDisclosure();
};

export const useCreateIDCardDisclosureSingleton = () => {
  const { useCreateIDCardDisclosure } = useContext(DiscloresuresContext)!;
  return useCreateIDCardDisclosure;
};
