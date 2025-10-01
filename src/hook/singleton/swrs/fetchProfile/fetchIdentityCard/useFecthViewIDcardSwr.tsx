import { fetcher, postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface ViewIDCardResponse {
  message: string;
  isSuccess: boolean;
  data: {
    cardNumber: string;
    fullName: string;
    //sex: string;
    //nationality: string;
    dateOfBirth: string;
    placeOfOrigin: string;
    placeOfResidence: string;
    createDate: string;
    dayOfExpiry: string;
    frontImagePath: string;
    backImagePath: string;
  };
}

export const useFetchViewIDCardSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const viewIDCard = async (payload: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher<ViewIDCardResponse>(
        `/api/v1/identity-cards/users/${payload}`
      );
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { viewIDCard, loading, error, setError };
};

export const useFetchViewIDCardSwrSingleton = () => {
  const { useFetchViewIDCardSwr } = useContext(SwrContext)!;
  return useFetchViewIDCardSwr;
};
