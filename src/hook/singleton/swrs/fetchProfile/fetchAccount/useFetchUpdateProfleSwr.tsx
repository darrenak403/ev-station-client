import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";
import { putMutationFetcher } from "@/lib/fetcher";

interface FetchUpdateProfileRequest {
  email: string;
  fullName: string;
  avatarUrl: string;
}

interface FetchUpdateProfileResponse {
  message: string;
  isSuccess: boolean;
}

export const useFetchUpdateProfileSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateProfile = async (
    payload: FetchUpdateProfileRequest,
    id: string
  ) => {
    setLoading(true);
    setError(null);
    try {
      console.log("Updating profile with payload:", payload, "and id:", id);
      const result = await putMutationFetcher<
        FetchUpdateProfileResponse,
        FetchUpdateProfileRequest
      >(`/api/v1/users/${id}`, { arg: payload });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { updateProfile, loading, error, setError };
};

export const useFetchUpdateProfileSwrSingleton = () => {
  const { useFetchUpdateProfileSwr } = useContext(SwrContext)!;
  return useFetchUpdateProfileSwr;
};
