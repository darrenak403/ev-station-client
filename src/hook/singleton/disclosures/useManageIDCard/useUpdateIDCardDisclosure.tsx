"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useCallback, useContext, useState } from "react";

export interface IDCardData {
  cardNumber: string;
  fullName: string;
  sex: string;
  nationality: string;
  dateOfBirth: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  createDate: string;
  dayOfExpiry?: string;
  frontImagePath?: string;
  backImagePath?: string;
}

export const useUpdateIDCardDisclosureCore = () => {
  const disclosure = useDisclosure();
  const [successCallback, setSuccessCallback] = useState<(() => void) | null>(
    null
  );
  const [initialData, setInitialData] = useState<IDCardData | null>(null);

  const openWithData = (values: IDCardData) => {
    setInitialData(values);
  };

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
    openWithData,
    initialData,
  };
};

export const useUpdateIDCardDisclosureSingleton = () => {
  const { useUpdateIDCardDisclosure } = useContext(DiscloresuresContext)!;
  return useUpdateIDCardDisclosure;
};
