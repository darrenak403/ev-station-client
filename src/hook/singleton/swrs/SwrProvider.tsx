import React from "react";
import {PropsWithChildren, createContext} from "react";
import {useFetchLoginSwrCore} from "./auth/useFetchLoginSwr";
import {useFetchLoginGoogleSwrCore} from "./auth/useFetchLoginGoogleSwr";
import {useFetchRegisterSwrCore} from "./auth/useFetchRegisterSwr";

export interface SwrContextType {
  useFetchLoginSwr: ReturnType<typeof useFetchLoginSwrCore>;
  useFetchLoginGoogleSwr: ReturnType<typeof useFetchLoginGoogleSwrCore>; // Thêm dòng này
  useFetchRegisterSwr: ReturnType<typeof useFetchRegisterSwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null);

export const SwrProvider = ({children}: PropsWithChildren) => {
  const useFetchLoginSwr = useFetchLoginSwrCore();
  const useFetchLoginGoogleSwr = useFetchLoginGoogleSwrCore();
  const useFetchRegisterSwr = useFetchRegisterSwrCore();
  return (
    <>
      <SwrContext.Provider
        value={{
          useFetchLoginSwr,
          useFetchLoginGoogleSwr,
          useFetchRegisterSwr,
        }}
      >
        {children}
      </SwrContext.Provider>
    </>
  );
};
