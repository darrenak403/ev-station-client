import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useFetchLoginSwrCore } from "./useFetchLoginSwr";
import { useFetchLoginGoogleSwrCore } from "./useFetchLoginGoogleSwr";
import { useFetchRegisterSwrCore } from "./useFetchRegisterSwr";
import { useFetchGetAllUsersSwrCore } from "./useFetchGetAllUsersSwr";

export interface SwrContextType {
  useFetchLoginSwr: ReturnType<typeof useFetchLoginSwrCore>;
  useFetchLoginGoogleSwr: ReturnType<typeof useFetchLoginGoogleSwrCore>; 
  useFetchRegisterSwr: ReturnType<typeof useFetchRegisterSwrCore>;
  useFetchGetAllUsersSwr: ReturnType<typeof useFetchGetAllUsersSwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null);

export const SwrProvider = ({children}: PropsWithChildren) => {
  const useFetchLoginSwr = useFetchLoginSwrCore();
  const useFetchLoginGoogleSwr = useFetchLoginGoogleSwrCore();
  const useFetchRegisterSwr = useFetchRegisterSwrCore();
  const useFetchGetAllUsersSwr = useFetchGetAllUsersSwrCore();
  return (
    <>
      <SwrContext.Provider
        value={{
          useFetchLoginSwr,
          useFetchLoginGoogleSwr,
          useFetchRegisterSwr,
          useFetchGetAllUsersSwr,
        }}
      >
        {children}
      </SwrContext.Provider>
    </>
  );
};
