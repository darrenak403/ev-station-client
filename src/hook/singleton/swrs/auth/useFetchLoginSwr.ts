import {useContext, useState} from "react";
import {useDispatch} from "react-redux";
import {postMutationFetcher} from "@/lib/fetcher";
import {SwrContext} from "../SwrProvider";
import {setAuth} from "@/redux/slices/authSlice";

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  message: string;
  isSuccess: boolean;
  data: {
    user: {
      id: string;
      roleName: string;
      email: string;
      fullName: string;
      avatarUrl: string;
    };
    accessToken: string;
    refreshToken: string;
  };
}

export const useFetchLoginSwrCore = () => {
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const login = async (payload: LoginRequest) => {
    setLoading(true);
    try {
      const result = await postMutationFetcher<AuthResponse, LoginRequest>(
        "/api/v1/auth/login",
        {arg: payload}
      );
      console.log("Login API result:", result); // Debug
      if (result.isSuccess) {
        dispatch(
          setAuth({
            accessToken: result.data.accessToken,
            refreshToken: result.data.refreshToken,
            id: result.data.user.id,
            roleName: result.data.user.roleName,
            email: result.data.user.email,
            fullName: result.data.user.fullName,
            avatarUrl: result.data.user.avatarUrl,
          })
        );
      }
      return result;
    } finally {
      setLoading(false);
    }
  };

  return {login, loading};
};

export const useFetchLoginSwrSingleton = () => {
  const {useFetchLoginSwr} = useContext(SwrContext)!;
  return useFetchLoginSwr;
};
