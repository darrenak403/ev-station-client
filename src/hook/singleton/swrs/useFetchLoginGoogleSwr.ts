import { useContext, useState } from "react";
import { postMutationFetcher } from "@/lib/fetcher";
import { SwrContext } from "./SwrProvider";

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleAuthResponse {
  token: string;
  user?: unknown;
  message: string;
  isSuccess: boolean;
}

export function useFetchLoginGoogleSwrCore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loginWithGoogle = async (idToken: string): Promise<GoogleAuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await postMutationFetcher<
        GoogleAuthResponse,
        GoogleLoginRequest
      >("/api/v1/auth/google-login", { arg: { idToken } });

      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { loginWithGoogle, loading, error, setError };
}

export const useFetchLoginGoogleSingleton = () => {
   const {useFetchLoginGoogleSwr} = useContext(SwrContext)!;
  return useFetchLoginGoogleSwr;
};