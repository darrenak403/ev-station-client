import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { fetcher } from "@/lib/fetcher";
import { SwrContext } from "../SwrProvider";

export type ApiUser = {
  id: string;
  email: string;
  fullName: string;
  avatarUrl?: string;
  roleName?: string;
};

type UsersResponse = {
  isSuccess: boolean;
  message?: string;
  data: ApiUser[];
};

export const useFetchGetAllUsersSwrCore = () => {
  const [users, setUsers] = useState<ApiUser[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const mountedRef = useRef(true);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const payload = await fetcher<UsersResponse>("/api/v1/users");
      if (!mountedRef.current) return;
      if (payload?.isSuccess) {
        setUsers(payload.data ?? []);
      } else {
        setError(payload?.message ?? "Failed to load users");
      }
    } catch (err) {
      if (!mountedRef.current) return;
      setError((err as Error)?.message ?? "Failed to load users");
    } finally {
      if (!mountedRef.current) return;
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    void load();
    return () => {
      mountedRef.current = false;
    };
  }, [load]);

  const refresh = useCallback(() => {
    void load();
  }, [load]);

  return { users, loading, error, refresh };
};

export const useFetchGetAllUsersSwrSingleton = () => {
  const { useFetchGetAllUsersSwr } = useContext(SwrContext)!;
  return useFetchGetAllUsersSwr;
};