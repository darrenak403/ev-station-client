import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface ScanIDCardRequest {
  frontImageUrl: string;
  backImageUrl: string;
}

export interface ScanIDCardResponse {
  message: string;
  isSuccess: boolean;
  data: {
    cardNumber: string;
    fullName: string;
    sex: string;
    nationality: string;
    dateOfBirth: Date;
    placeOfOrigin: string;
    placeOfResidence: string;
    createDate: Date;
    dayOfExpiry: Date;
  };
}

export const useFetchScanIDCardSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanIDCard = async (payload: ScanIDCardRequest) => {
    setLoading(true);
    setError(null);
    try {
      const result = await postMutationFetcher<ScanIDCardResponse, ScanIDCardRequest>(
        "/api/v1/identity-cards/scan-url",
         { arg: payload }
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
  return { scanIDCard, loading, error, setError };
};

export const useFetchScanIDCardSwrSingleton = () => {
  const { useFetchScanIDCardSwr } = useContext(SwrContext)!;
  return useFetchScanIDCardSwr;
};
