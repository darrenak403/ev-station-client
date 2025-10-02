import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useCreateUserDisclosureCore } from "./useManageAccount/useCreateUserDiscloresure";
import { useUpdateUserDisclosureCore } from "./useManageAccount/useUpdateUserDiscloresure";
import { useViewUserByIdDisclosureCore } from "./useManageAccount/useViewUserByIdDiscloresure";
import { useCreateIDCardDisclosureCore } from "./useManageIDCard/useCreateIDCardDisclosure";
import { useUpdateIDCardDisclosureCore } from "./useManageIDCard/useUpdateIDCardDisclosure";

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
}

export const DiscloresuresContext =
  createContext<DiscloresuresContextType | null>(null);

export const DiscloresuresProvider = ({children}: PropsWithChildren) => {
  const useCreateUserDisclosure = useCreateUserDisclosureCore();
  const useUpdateUserDisclosure = useUpdateUserDisclosureCore();
  const useViewUserByIdDisclosure = useViewUserByIdDisclosureCore();
  const useCreateIDCardDisclosure = useCreateIDCardDisclosureCore();
  const useUpdateIDCardDisclosure = useUpdateIDCardDisclosureCore();

  return (
    <>
      <DiscloresuresContext.Provider
        value={{
          useCreateUserDisclosure,
          useUpdateUserDisclosure,
          useViewUserByIdDisclosure,
          useCreateIDCardDisclosure,
          useUpdateIDCardDisclosure,
        }}
      >
        {children}
      </DiscloresuresContext.Provider>
    </>
  );
};
