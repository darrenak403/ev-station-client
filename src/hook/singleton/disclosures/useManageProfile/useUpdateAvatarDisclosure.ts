import { useContext } from "react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useDisclosure } from "@heroui/react";


export const useUpdateAvatarDisclosureCore = () => {
  return useDisclosure();
};

export const useUpdateAvatarDisclosureSingleton = () => {
  const { useUpdateAvatarDisclosure } = useContext(DiscloresuresContext)!;
  return useUpdateAvatarDisclosure;
};
