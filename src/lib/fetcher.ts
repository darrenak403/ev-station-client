import axios, { AxiosRequestConfig, AxiosResponse } from "axios";
import { store } from "@/redux/store";
import { setAccessToken, clearAuth } from "@/redux/slices/authSlice";
import {useRouter} from "next/navigation";


const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:8081";

const axiosInstance = axios.create({
  baseURL,
  timeout: 60000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================== REQUEST INTERCEPTOR ===================
axiosInstance.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// =================== RESPONSE INTERCEPTOR ===================
axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error?.config;
    const router = useRouter();

    if (!originalRequest) return Promise.reject(error);

    if (originalRequest.url?.includes("/api/v1/auth/refresh-token")) {
      console.warn("Refresh token request failed:", error);
      store.dispatch(clearAuth());
      return Promise.reject(error);
    }

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = store.getState().auth.refreshToken;
      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${baseURL}/api/v1/auth/refresh-token`,
            { refreshToken },
            { headers: { "x-skip-refresh": "1" } } 
          );

          if (data?.accessToken) {
            store.dispatch(setAccessToken(data.accessToken));

            originalRequest.headers = originalRequest.headers || {};
            originalRequest.headers.Authorization = `Bearer ${data.accessToken}`;

            return axiosInstance(originalRequest);
          }
        } catch (refreshError) {
          console.error("Refresh token thất bại:", refreshError);
        }
      }

      store.dispatch(clearAuth());
      if (typeof window !== "undefined" && window.location.pathname !== "/auth/sign-in") {
        router.push("/");
      }
    }

    return Promise.reject(error);
  }
);

// =================== FETCHERS ===================
export const fetcher = async <T>(url: string): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance.get(url);
  return response.data;
};

export const fetcherWithConfig = async <T>(
  [url, config]: [string, AxiosRequestConfig?]
): Promise<T> => {
  const response: AxiosResponse<T> = await axiosInstance({ url, ...config });
  return response.data;
};

// POST
export const postMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post(url, arg);
  return response.data;
};

// PUT
export const putMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.put(url, arg);
  return response.data;
};

// PATCH
export const patchMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.patch(url, arg);
  return response.data;
};

// DELETE
export const deleteMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg?: TBody } = { arg: undefined }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.delete(
    url,
    arg ? { data: arg } : {}
  );
  return response.data;
};

// FormData
export const formDataMutationFetcher = async <TResponse>(
  url: string,
  { arg }: { arg: FormData }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post(url, arg);
  return response.data;
};

// Generic
export const genericMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  {
    arg,
  }: {
    arg: {
      method?: "POST" | "PUT" | "PATCH" | "DELETE";
      data?: TBody;
      config?: AxiosRequestConfig;
    };
  }
): Promise<TResponse> => {
  const { method = "POST", data, config = {} } = arg;
  const response: AxiosResponse<TResponse> = await axiosInstance({
    url,
    method,
    data,
    ...config,
  });
  return response.data;
};

export default axiosInstance;
