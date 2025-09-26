import {useContext, useState} from "react";
import {postMutationFetcher} from "@/lib/fetcher";
import {SwrContext} from "../SwrProvider";
import {useDispatch} from "react-redux";
import {setAuth} from "@/redux/slices/authSlice";

export interface GoogleLoginRequest {
  idToken: string;
}

export interface GoogleAuthResponse {
  message: string;
  isSuccess: boolean;
  data: {
    user: {
      id: string;
      roleName: string;
      email: string;
      fullName: string;
      avatarUrl: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export function useFetchLoginGoogleSwrCore() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const dispatch = useDispatch();

  const loginWithGoogle = async (
    idToken: string
  ): Promise<GoogleAuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const result = await postMutationFetcher<
        GoogleAuthResponse,
        GoogleLoginRequest
      >("/api/v1/auth/google-login", {arg: {idToken}});

      if (result.isSuccess) {
        dispatch(
          setAuth({
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            id: result.data.user.id,
            roleName: result.data.user.roleName,
            email: result.data.user.email,
            fullName: result.data.user.fullName,
            avatarUrl: result.data.user.avatarUrl,
          })
        );
      }

      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {loginWithGoogle, loading, error, setError};
}

export const useFetchLoginGoogleSingleton = () => {
  const ctx = useContext(SwrContext);
  if (!ctx) throw new Error("SwrContext not provided");
  const {useFetchLoginGoogleSwr} = ctx;
  return useFetchLoginGoogleSwr;
};
