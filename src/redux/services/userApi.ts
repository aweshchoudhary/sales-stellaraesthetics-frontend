import { UserInterface } from "@/types/interface";
import { mainApi } from "./mainApi";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserInterface, null>({
      query: () => "/api/user/getme",
      providesTags: ["user"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getUser: builder.query<UserInterface, string>({
      query: (id) => "/api/user/get-user/" + id,
      providesTags: ["user"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: "/api/user/get-users/",
        params,
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/api/user/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["user"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: "/api/user/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const {
  useGetMeQuery,
  useLazyGetMeQuery,
  useGetUserQuery,
  useDeleteUserMutation,
  useUpdateUserMutation,
  useLazyGetUsersQuery,
  useGetUsersQuery,
  useLazyGetUserQuery,
} = userApi;
