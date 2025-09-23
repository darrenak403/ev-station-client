import React from "react";
import {PropsWithChildren, createContext} from "react";
import { useFetchLoginSwrCore } from "./useFetchLoginSwr";

export interface SwrContextType {
  useFetchLoginSwr: ReturnType<typeof useFetchLoginSwrCore>;
}

export const SwrContext = createContext<SwrContextType | null>(null);

export const SwrProvider = ({children}: PropsWithChildren) => {
  const useFetchLoginSwr = useFetchLoginSwrCore();
  return (
    <>
      <SwrContext.Provider
        value={{
          useFetchLoginSwr,
        }}
      >
        {children}
      </SwrContext.Provider>
    </>
  );
};
