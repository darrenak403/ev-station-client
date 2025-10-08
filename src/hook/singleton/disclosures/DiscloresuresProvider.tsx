import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useCreateUserDisclosureCore } from "./useManageAccount/useCreateUserDiscloresure";
import { useUpdateUserDisclosureCore } from "./useManageAccount/useUpdateUserDiscloresure";
import { useViewUserByIdDisclosureCore } from "./useManageAccount/useViewUserByIdDiscloresure";
import { useCreateIDCardDisclosureCore } from "./useManageIDCard/useCreateIDCardDisclosure";
import { useUpdateIDCardDisclosureCore } from "./useManageIDCard/useUpdateIDCardDisclosure";
import { useCreateLicenseDriverDisclosureCore } from "./useManageLicenseDriver/useCreateLicenseDriverDisclosure";
import { useUpdateLicenseDriverDisclosureCore } from "./useManageLicenseDriver/useUpdateLicenseDriverDisclosure";
import { useUpdateAvatarDisclosureCore } from "./useManageProfile/useUpdateAvatarDisclosure";

export interface DiscloresuresContextType {
  useCreateUserDisclosure: ReturnType<
    typeof useCreateUserDisclosureCore
  >;
  useUpdateUserDisclosure: ReturnType<
    typeof useUpdateUserDisclosureCore
  >;
  useViewUserByIdDisclosure: ReturnType<
    typeof useViewUserByIdDisclosureCore
  >;
  useCreateIDCardDisclosure: ReturnType<
    typeof useCreateIDCardDisclosureCore
  >;
  useUpdateIDCardDisclosure: ReturnType<
    typeof useUpdateIDCardDisclosureCore
  >
  useCreateLicenseDriverDisclosure: ReturnType<
    typeof useCreateLicenseDriverDisclosureCore
  >
  useUpdateLicenseDriverDisclosure: ReturnType<
    typeof useUpdateLicenseDriverDisclosureCore
  >
  useUpdateAvatarDisclosure: ReturnType<
    typeof useUpdateAvatarDisclosureCore
  >;
}

export const DiscloresuresContext =
  createContext<DiscloresuresContextType | null>(null);

export const DiscloresuresProvider = ({children}: PropsWithChildren) => {
  const useCreateUserDisclosure = useCreateUserDisclosureCore();
  const useUpdateUserDisclosure = useUpdateUserDisclosureCore();
  const useViewUserByIdDisclosure = useViewUserByIdDisclosureCore();
  const useCreateIDCardDisclosure = useCreateIDCardDisclosureCore();
  const useUpdateIDCardDisclosure = useUpdateIDCardDisclosureCore();
  const useCreateLicenseDriverDisclosure = useCreateLicenseDriverDisclosureCore();
  const useUpdateLicenseDriverDisclosure = useUpdateLicenseDriverDisclosureCore();
  const useUpdateAvatarDisclosure = useUpdateAvatarDisclosureCore();

  return (
    <>
      <DiscloresuresContext.Provider
        value={{
          useCreateUserDisclosure,
          useUpdateUserDisclosure,
          useViewUserByIdDisclosure,
          useCreateIDCardDisclosure,
          useUpdateIDCardDisclosure,
          useCreateLicenseDriverDisclosure,
          useUpdateLicenseDriverDisclosure,
          useUpdateAvatarDisclosure,
        }}
      >
        {children}
      </DiscloresuresContext.Provider>
    </>
  );
};
