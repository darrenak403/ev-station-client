import { useContext, useState } from "react";
import { postMutationFetcher } from "@/lib/fetcher";
import { SwrContext } from "./SwrProvider";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  accessToken: string;
  user?: unknown;
  message: string;
  isSuccess: boolean;
}

export const useFetchLoginSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const login = async (payload: LoginRequest): Promise<AuthResponse> => {
    setLoading(true);
    setError(null);
    try {
      // giữ behavior: chờ 3s trước khi gọi API
      await new Promise((r) => setTimeout(r, 3000));

      const result = await postMutationFetcher<AuthResponse, LoginRequest>(
        "/api/v1/auth/login",
        { arg: payload }
      );

      // Lưu token & message khi thành công (giữ tương thích với logic cũ)
      if (result?.isSuccess) {
        if (result.accessToken) {
            console.log("Access Token:", result.accessToken);
          localStorage.setItem("accessToken", result.accessToken);
        }
        localStorage.setItem("loginSuccessMsg", "Đăng nhập thành công!");
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

  return { login, loading, error, setError };
}

export const useFetchLoginSwrSingleton = () => {
  const {useFetchLoginSwr} = useContext(SwrContext)!;
  return useFetchLoginSwr;
};