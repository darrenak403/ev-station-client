import { postMutationFetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

export interface ScanLicenseDriverRequest {
  frontImageUrl: string;
  backImageUrl: string;
}

export interface ScanLicenseDriverResponse {
  message: string;
  isSuccess: boolean;
  data: {
    licenseNumber: string;
    fullName: string;
    dateOfBirth: string;
    nationality: string;
    address: string;
    licenseClass: string;
    beginingDate: string;
    expiresDate: string;
    classificationOfMotorVehicles: string;
  };
}

export const useFetchScanLicenseDriverSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const scanLicenseDriver = async (
    payload: ScanLicenseDriverRequest
  ): Promise<ScanLicenseDriverResponse> => {
    setLoading(true);
    setError(null);
    try {
      const result = await postMutationFetcher<
        ScanLicenseDriverResponse,
        ScanLicenseDriverRequest
      >("/api/v1/driver-licenses/scan-url", { arg: payload });
      return result;
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);
      setError(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };
  return { scanLicenseDriver, loading, error, setError };
};

export const useFetchScanLicenseDriverSwrSingleton = () => {
  const { useFetchScanLicenseDriverSwr } = useContext(SwrContext)!;
  return useFetchScanLicenseDriverSwr;
};
