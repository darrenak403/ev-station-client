"use client";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

export default function ProtectedRoute({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles?: string[];
}) {
  const authState = useSelector((state: RootState) => state.auth);
  const router = useRouter();
  const dispatch = useDispatch();
  const [checking, setChecking] = useState(true);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const checkAuth = async () => {

      if (!authState.accessToken && !authState.refreshToken) {
        router.push("/auth/sign-in");
        return;
      }

      if (authState.accessToken && authState.data?.user?.roleName) {
        if (allowedRoles) {
          const userRole = authState.data.user.roleName;
          if (!allowedRoles.includes(userRole)) {
            router.push("/");
            return;
          }
        }
        setChecking(false);
        return;
      }

      if (authState.accessToken) {
        setChecking(false);
        return;
      }

      if (!authState.accessToken && authState.refreshToken) {
        setChecking(false);
        return;
      }
      router.push("/auth/sign-in");
    };

    const timer = setTimeout(checkAuth, 100);
    return () => clearTimeout(timer);
  }, [isClient, authState, allowedRoles, dispatch, router]);

  if (!isClient || checking) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto mb-2"></div>
          <p>Đang kiểm tra quyền truy cập...</p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
