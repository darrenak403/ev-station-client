import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface SaveIDCardRequest {
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

export interface SaveIDCardResponse {
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
      console.log("Saving ID Card with payload:", payload);
      const result = await postMutationFetcher<
        SaveIDCardResponse,
        SaveIDCardRequest
      >("/api/v1/identity-cards", { arg: payload });
      console.log("Save ID Card API result:", result);
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
