import axios, { AxiosRequestConfig, AxiosResponse } from "axios";

const baseURL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "https://localhost:8081";

const axiosInstance = axios.create({
  baseURL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

// =================== REQUEST INTERCEPTOR ===================
axiosInstance.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// =================== RESPONSE INTERCEPTOR ===================
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("accessToken");
      if (typeof window !== "undefined") {
        window.location.href = "/auth/sign-in";
      }
    }
    return Promise.reject(error);
  }
);

// =================== FETCHERS FOR useSWR (GET) ===================
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

// =================== FETCHERS FOR useSWRMutation ===================

// POST mutation fetcher
export const postMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post(url, arg);
  return response.data;
};

// PUT mutation fetcher
export const putMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.put(url, arg);
  return response.data;
};

// PATCH mutation fetcher
export const patchMutationFetcher = async <TResponse, TBody = unknown>(
  url: string,
  { arg }: { arg: TBody }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.patch(url, arg);
  return response.data;
};

// DELETE mutation fetcher
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

// FormData mutation fetcher (axios sẽ tự set header multipart/form-data)
export const formDataMutationFetcher = async <TResponse>(
  url: string,
  { arg }: { arg: FormData }
): Promise<TResponse> => {
  const response: AxiosResponse<TResponse> = await axiosInstance.post(url, arg);
  return response.data;
};

// Generic mutation fetcher
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
