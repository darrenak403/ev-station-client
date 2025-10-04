import { fetcher } from "@/lib/fetcher";
import { useContext, useState } from "react";
import { SwrContext } from "../../SwrProvider";

interface ViewLicenseDriverReponse {
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
    frontImagePath: string;
    backImagePath: string;
  };
}

export const useFetchViewLicenseDriverSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const viewLicenseDriver = async (payload: string) => {
    setLoading(true);
    setError(null);
    try {
      const result = await fetcher<ViewLicenseDriverReponse>(
        `/api/v1/driver-licenses/${payload}`
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
  return { viewLicenseDriver, loading, error, setError };
};

export const useFetchViewLicenseDriverSwrSingleton = () => {
  const { useFetchViewLicenseDriverSwr } = useContext(SwrContext)!;
  return useFetchViewLicenseDriverSwr;
};
