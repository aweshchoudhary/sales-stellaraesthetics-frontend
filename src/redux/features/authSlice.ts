import { getLocalStorageItem } from "@/lib/localStorageHelper";
import { UserInterface } from "@/types/interface";
import { createSlice } from "@reduxjs/toolkit";

interface AuthSliceInterface {
  accessToken: string | null;
  user: any | null;
}

const initialState: AuthSliceInterface = {
  accessToken: getLocalStorageItem("accessToken") || null,
  user: getLocalStorageItem("user", true) || null,
};

const authSlice: any = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, { payload }) => {
      if (payload?.accessToken) {
        state.accessToken = payload.accessToken;
        localStorage.setItem("accessToken", payload.accessToken);
      }
      if (payload?.user) {
        state.user = payload.user;
        localStorage.setItem("user", JSON.stringify(payload.user));
      }
    },
    logOut: (state) => {
      state.accessToken = null;
      state.user = null;
      localStorage.removeItem("accessToken");
      localStorage.removeItem("user");
    },
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (state: any) => state.auth.user;
export const selectCurrentToken = (state: any) => state.auth.accessToken;
