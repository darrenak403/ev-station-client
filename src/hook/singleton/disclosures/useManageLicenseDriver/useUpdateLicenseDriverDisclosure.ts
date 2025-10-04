"use client";
import { useDisclosure } from "@heroui/react";
import { DiscloresuresContext } from "../DiscloresuresProvider";
import { useCallback, useContext, useState } from "react";

export interface LicenseDriverData {
  licenseNumber: string,
  fullName: string,
  dateOfBirth: string,
  nationality: string,
  address: string,
  licenseClass: string,
  beginingDate: string,
  expiresDate: string,
  classificationOfMotorVehicles: string,
  frontImagePath: string,
  backImagePath: string
}

export const useUpdateLicenseDriverDisclosureCore = () => {
  const disclosure = useDisclosure();
  const [successCallback, setSuccessCallback] = useState<(() => void) | null>(
    null
  );
  const [initialData, setInitialData] = useState<LicenseDriverData | null>(null);

  const openWithData = (values: LicenseDriverData) => {
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

export const useUpdateLicenseDriverDisclosureSingleton = () => {
  const { useUpdateLicenseDriverDisclosure } = useContext(DiscloresuresContext)!;
  return useUpdateLicenseDriverDisclosure;
}
