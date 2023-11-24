import { UserInterface } from "@/types/interface";
import { mainApi } from "./mainApi";

export const userApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getMe: builder.query<UserInterface, null>({
      query: () => "/user/getme",
      providesTags: ["user"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getUser: builder.query<UserInterface, string>({
      query: (id) => "/user/get-user/" + id,
      providesTags: ["user"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getUsers: builder.query({
      query: (params) => ({
        url: "/user/get-users/",
        params,
      }),
      providesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/user/" + data.id,
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
        url: "/user/" + id,
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
