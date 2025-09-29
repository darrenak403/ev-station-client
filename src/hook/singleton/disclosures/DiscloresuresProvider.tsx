import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useCreateUserDisclosureCore } from "./useManageAccount/useCreateUserDiscloresure";
import { useUpdateUserDisclosureCore } from "./useManageAccount/useUpdateUserDiscloresure";
import { useViewUserByIdDisclosureCore } from "./useManageAccount/useViewUserByIdDiscloresure";

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
}

export const DiscloresuresContext =
  createContext<DiscloresuresContextType | null>(null);

export const DiscloresuresProvider = ({children}: PropsWithChildren) => {
  const useCreateUserDisclosure = useCreateUserDisclosureCore();
  const useUpdateUserDisclosure = useUpdateUserDisclosureCore();
  const useViewUserByIdDisclosure = useViewUserByIdDisclosureCore();
  return (
    <>
      <DiscloresuresContext.Provider
        value={{
          useCreateUserDisclosure,
          useUpdateUserDisclosure,
          useViewUserByIdDisclosure,
        }}
      >
        {children}
      </DiscloresuresContext.Provider>
    </>
  );
};
