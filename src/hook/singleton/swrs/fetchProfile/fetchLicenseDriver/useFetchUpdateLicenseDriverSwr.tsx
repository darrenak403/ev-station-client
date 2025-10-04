import { putMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

interface UpdateLicenseDriverRequest {
  licenseNumber: string;
  fullName: string;
  dateOfBirth: string;
  nationality: string;
  address: string;
  licenseClass: string;
  beginingDate: string;
  expiresDate: string;
  classificationOfMotorVehicles: string;
  frontImagePath: string;
  backImagePath: string;
}

interface UpdateLicenseDriverResponse {
  message: string;
  isSuccess: boolean;
}

export const useFetchUpdateLicenseDriverSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const updateLicenseDriver = async (
    payload: UpdateLicenseDriverRequest,
    id: string
  ): Promise<UpdateLicenseDriverResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await putMutationFetcher<
        UpdateLicenseDriverResponse,
        UpdateLicenseDriverRequest
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
  return { updateLicenseDriver, loading, error, setError };
};

export const useFetchUpdateLicenseDriverSwrSingleton = () => {
  const { useFetchUpdateLicenseDriverSwr } = useContext(SwrContext)!;
  return useFetchUpdateLicenseDriverSwr;
};
