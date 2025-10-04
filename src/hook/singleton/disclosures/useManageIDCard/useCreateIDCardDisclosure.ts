"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useCallback, useContext, useState } from "react";

export const useCreateIDCardDisclosureCore = () => {
  const disclosure = useDisclosure();
  const [successCallback, setSuccessCallback] = useState<(() => void) | null>(
    null
  );

  const onSuccess = useCallback(() => {
    if (successCallback) {
      successCallback();
    }
    disclosure.onClose();
  }, [successCallback, disclosure]);

  return {
    ...disclosure,
    setOnSuccess: setSuccessCallback,
    onSuccess,
  };
};

export const useCreateIDCardDisclosureSingleton = () => {
  const { useCreateIDCardDisclosure } = useContext(DiscloresuresContext)!;
  return useCreateIDCardDisclosure;
};
