import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useFetchLoginSwrCore } from "./useFetchLoginSwr";
import { useFetchLoginGoogleSwrCore } from "./useFetchLoginGoogleSwr";
import { useFetchRegisterSwrCore } from "./useFetchRegisterSwr";
import { useFetchGetAllUsersSwrCore } from "./useFetchGetAllUsersSwr";
import { useFetchUploadImgCore } from "./useFetchUploadImgSwr";
import { useFetchScanIDCardSwrCore } from "./useFetchScanIDCardSwr";
import { useFetchSaveIDCardSwrCore } from "./useFetchSaveIDCardSwr";

export interface SwrContextType {
  useFetchLoginSwr: ReturnType<typeof useFetchLoginSwrCore>;
  useFetchLoginGoogleSwr: ReturnType<typeof useFetchLoginGoogleSwrCore>; 
  useFetchRegisterSwr: ReturnType<typeof useFetchRegisterSwrCore>;
  useFetchGetAllUsersSwr: ReturnType<typeof useFetchGetAllUsersSwrCore>;
  useFetchUploadImgSwr?: ReturnType<typeof useFetchUploadImgCore>; 
  useFetchScanIDCardSwr?: ReturnType<typeof useFetchScanIDCardSwrCore>;
  useFetchSaveIDCardSwr?: ReturnType<typeof useFetchSaveIDCardSwrCore>; 
}

export const SwrContext = createContext<SwrContextType | null>(null);

export const SwrProvider = ({children}: PropsWithChildren) => {
  const useFetchLoginSwr = useFetchLoginSwrCore();
  const useFetchLoginGoogleSwr = useFetchLoginGoogleSwrCore();
  const useFetchRegisterSwr = useFetchRegisterSwrCore();
  const useFetchGetAllUsersSwr = useFetchGetAllUsersSwrCore();
  const useFetchUploadImgSwr = useFetchUploadImgCore();
  const useFetchScanIDCardSwr = useFetchScanIDCardSwrCore();
  const useFetchSaveIDCardSwr = useFetchSaveIDCardSwrCore();

  return (
    <>
      <SwrContext.Provider
        value={{
          useFetchLoginSwr,
          useFetchLoginGoogleSwr,
          useFetchRegisterSwr,
          useFetchGetAllUsersSwr,
          useFetchUploadImgSwr,
          useFetchScanIDCardSwr,
          useFetchSaveIDCardSwr,
        }}
      >
        {children}
      </SwrContext.Provider>
    </>
  );
};
