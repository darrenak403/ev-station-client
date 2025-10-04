import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface SaveLicenseDriverRequest {
  licenseNumber: string,
  fullName: string,
  dateOfBirth: string,
  nationality: string,
  address: string,
  licenseClass: string,
  beginingDate: string,
  expiresDate: string,
  classificationOfMotorVehicles: string,
  frontImagePath: string,
  backImagePath: string
}

export interface SaveLicenseDriverReponse {
  message: string;
  isSuccess: boolean;
}

export const useFetchSaveLicenseDriverSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const saveLicenseDriver = async (
    payload: SaveLicenseDriverRequest
  ): Promise<SaveLicenseDriverReponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await postMutationFetcher<
        SaveLicenseDriverReponse,
        SaveLicenseDriverRequest
      >("/api/v1/driver-licenses", { arg: payload });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { saveLicenseDriver, loading, error, setError };
};

export const useFetchSaveLicenseDriverSwrSingleton = () => {
  const { useFetchSaveLicenseDriverSwr } = useContext(SwrContext)!;
  return useFetchSaveLicenseDriverSwr;
}
