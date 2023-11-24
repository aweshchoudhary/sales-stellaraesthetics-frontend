import BASE_URL from "@/lib/baseurl";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { setCredentials, logOut } from "../features/authSlice";
import { auth } from "@/lib/fireabase";
import { signOut } from "firebase/auth";

const baseQuery = fetchBaseQuery({
  baseUrl: BASE_URL,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.accessToken;
    if (token) {
      headers.set("Authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

const baseQueryWithReauth = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions);

  const status = result?.error?.status;
  if (status === 403 || status === 401) {
    await signOut(auth);
    api.dispatch(logOut());
  }

  return result;
};

export const mainApi = createApi({
  baseQuery: baseQueryWithReauth,
  tagTypes: [
    "pipelines",
    "stage",
    "deal",
    "activity",
    "user",
    "file",
    "note",
    "label",
    "contact",
    "item",
    "dealItem",
    "notification",
  ],
  endpoints: (builder) => ({}),
});
