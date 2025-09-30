import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface ViewIDCardRequest {
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

export interface ViewIDCardResponse {
  message: string;
  isSuccess: boolean;
}

export const useFetchSaveIDCardSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveIDCard = async (
    payload: SaveIDCardRequest
  ): Promise<SaveIDCardResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await postMutationFetcher<
        SaveIDCardResponse,
        SaveIDCardRequest
      >("/api/v1/identity-cards", { arg: payload });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { saveIDCard, loading, error, setError };
};

export const useFetchSaveIDCardSwrSingleton = () => {
  const { useFetchSaveIDCardSwr } = useContext(SwrContext)!;
  return useFetchSaveIDCardSwr;
};
