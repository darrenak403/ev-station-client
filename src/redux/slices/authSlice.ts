// redux/slices/authSlice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  accessToken: string | null;
  refreshToken: string | null;
  data: {
    user: {
      id: string | null;
      email: string | null;
      fullName: string | null;
      avatarUrl: string | null;
      roleName: string | null;
    } | null;
  } | null;
}

const initialState: AuthState = {
  accessToken: null,
  refreshToken: null,
  data: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuth: (
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        id: string;
        roleName: string;
        email?: string;
        fullName?: string;
        avatarUrl?: string;
      }>
    ) => {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.data = {
        user: {
          id: action.payload.id,
          roleName: action.payload.roleName,
          email: action.payload.email || null,
          fullName: action.payload.fullName || null,
          avatarUrl: action.payload.avatarUrl || null,
        }
      };
    },
    setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },
    setUserData: (
      state,
      action: PayloadAction<{
        id: string;
        email: string;
        fullName: string;
        avatarUrl: string;
        roleName: string;
      }>
    ) => {
      if (!state.data) state.data = { user: null };
      state.data.user = action.payload;
    },
    clearAuth: (state) => {
      state.accessToken = null;
      state.refreshToken = null;
      state.data = null;
    },
  },
});

export const { setAuth, setAccessToken, setUserData, clearAuth } = authSlice.actions;
export default authSlice.reducer;
