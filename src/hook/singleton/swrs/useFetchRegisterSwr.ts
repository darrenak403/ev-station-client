
import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "./SwrProvider";

export interface RegisterRequest {
  email: string;
  password: string;
}

export interface RegisterAuthResponse {
  data?: unknown;
  message: string;
  isSuccess: boolean;
}

export const useFetchRegisterSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const register = async (payload: RegisterRequest): Promise<RegisterAuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      await new Promise((r) => setTimeout(r, 2000));

      const result = await postMutationFetcher<RegisterAuthResponse, RegisterRequest>(
        "/api/v1/auth/register",
        { arg: payload }
      );

      if (result?.isSuccess) {
        //localStorage.setItem("registerSuccessMsg", "Đăng ký thành công! Bạn có thể đăng nhập!");
        result.message = "Đăng ký thành công! Bạn có thể đăng nhập!";
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

  return { register, loading, error, setError };
}

export const useFetchRegisterSwrSingleton = () => {
  const {useFetchRegisterSwr} = useContext(SwrContext)!;
  return useFetchRegisterSwr;
};
