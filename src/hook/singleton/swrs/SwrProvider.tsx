import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useFetchLoginSwrCore } from "./fetchAuth/useFetchLoginSwr";
import { useFetchLoginGoogleSwrCore } from "./fetchAuth/useFetchLoginGoogleSwr";
import { useFetchRegisterSwrCore } from "./fetchAuth/useFetchRegisterSwr";
import { useFetchGetAllUsersSwrCore } from "./fetchManageAccount/useFetchGetAllUsersSwr";
import { useFetchUploadImgCore } from "./uploadImage/useFetchUploadImgSwr";
import { useFetchScanIDCardSwrCore } from "./fetchProfile/fetchIdentityCard/useFetchScanIDCardSwr";
import { useFetchSaveIDCardSwrCore } from "./fetchProfile/fetchIdentityCard/useFetchSaveIDCardSwr";
import { useFetchViewIDCardSwrCore } from "./fetchProfile/fetchIdentityCard/useFecthViewIDcardSwr";
import { useFetchUpdateIDCardSwrCore } from "./fetchProfile/fetchIdentityCard/useFetchUpdateIDCardSwr";
import { useFetchScanLicenseDriverSwrCore } from "./fetchProfile/fetchLicenseDriver/useFetchScanLicenseDriverSwr";
import { useFetchSaveLicenseDriverSwrCore } from "./fetchProfile/fetchLicenseDriver/useFetchSaveLicenseDriverSwr";
import { useFetchViewLicenseDriverSwrCore } from "./fetchProfile/fetchLicenseDriver/useFetchViewLicenseDriverSwr";
import { useFetchUpdateLicenseDriverSwrCore } from "./fetchProfile/fetchLicenseDriver/useFetchUpdateLicenseDriverSwr";
import { useFetchUpdateProfileSwrCore } from "./fetchProfile/fetchAccount/useFetchUpdateProfleSwr";

export interface SwrContextType {
  useFetchLoginSwr: ReturnType<typeof useFetchLoginSwrCore>;
  useFetchLoginGoogleSwr: ReturnType<typeof useFetchLoginGoogleSwrCore>; 
  useFetchRegisterSwr: ReturnType<typeof useFetchRegisterSwrCore>;
  useFetchGetAllUsersSwr: ReturnType<typeof useFetchGetAllUsersSwrCore>;
  useFetchUploadImgSwr: ReturnType<typeof useFetchUploadImgCore>; 
  useFetchScanIDCardSwr: ReturnType<typeof useFetchScanIDCardSwrCore>;
  useFetchSaveIDCardSwr: ReturnType<typeof useFetchSaveIDCardSwrCore>; 
  useFetchViewIDCardSwr: ReturnType<typeof useFetchViewIDCardSwrCore>;
  useFetchUpdateIDCardSwr: ReturnType<typeof useFetchUpdateIDCardSwrCore>;
  useFetchScanLicenseDriverSwr: ReturnType<typeof useFetchScanLicenseDriverSwrCore>;
  useFetchSaveLicenseDriverSwr: ReturnType<typeof useFetchSaveLicenseDriverSwrCore>; 
  useFetchViewLicenseDriverSwr: ReturnType<typeof useFetchViewLicenseDriverSwrCore>;
  useFetchUpdateLicenseDriverSwr: ReturnType<typeof useFetchUpdateLicenseDriverSwrCore>;
  useFetchUpdateProfileSwr: ReturnType<typeof useFetchUpdateProfileSwrCore>;
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
  const useFetchViewIDCardSwr = useFetchViewIDCardSwrCore();
  const useFetchUpdateIDCardSwr = useFetchUpdateIDCardSwrCore();
  const useFetchScanLicenseDriverSwr = useFetchScanLicenseDriverSwrCore();
  const useFetchSaveLicenseDriverSwr = useFetchSaveLicenseDriverSwrCore();
  const useFetchViewLicenseDriverSwr = useFetchViewLicenseDriverSwrCore();
  const useFetchUpdateLicenseDriverSwr = useFetchUpdateLicenseDriverSwrCore();
  const useFetchUpdateProfileSwr = useFetchUpdateProfileSwrCore();

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
          useFetchViewIDCardSwr,
          useFetchUpdateIDCardSwr,
          useFetchScanLicenseDriverSwr,
          useFetchSaveLicenseDriverSwr,
          useFetchViewLicenseDriverSwr,
          useFetchUpdateLicenseDriverSwr,
          useFetchUpdateProfileSwr,
        }}
      >
        {children}
      </SwrContext.Provider>
    </>
  );
};
