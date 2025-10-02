import { postMutationFetcher, putMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface UpdateIDCardRequest {
  cardNumber: string;
  fullName: string;
  sex: string;
  nationality: string;
  dateOfBirth: string;
  placeOfOrigin: string;
  placeOfResidence: string;
  createDate: string;
  dayOfExpiry: string;
  frontImagePath: string;
  backImagePath: string;
}

export interface UpdateIDCardResponse {
  message: string;
  isSuccess: boolean;
}

export const useFetchUpdateIDCardSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateIDCard = async (
    payload: UpdateIDCardRequest, id: string
  ): Promise<UpdateIDCardResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await putMutationFetcher<
        UpdateIDCardResponse,
        UpdateIDCardRequest
      >(`/api/v1/identity-cards/${id}`, { arg: payload });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { updateIDCard, loading, error, setError };
};

export const useFetchUpdateIDCardSwrSingleton = () => {
  const { useFetchUpdateIDCardSwr } = useContext(SwrContext)!;
  return useFetchUpdateIDCardSwr;
};
