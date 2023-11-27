import { mainApi } from "./main.api";

export const notificationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    getNotification: builder.query({
      query: (data) => ({
        url: "/notifications/" + data.id,
        params: data.params,
      }),
      providesTags: ["notification"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getNotifications: builder.query({
      query: (params) => ({
        url: "/notifications/",
        params,
      }),
      providesTags: ["notification"],
    }),
    updateNotification: builder.mutation({
      query: (data) => ({
        url: "/notifications/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: "/notifications/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["notification"],
    }),
  }),
});

export const {
  useGetNotificationQuery,
  useUpdateNotificationMutation,
  useCreateNotificationMutation,
  useDeleteNotificationMutation,
  useGetNotificationsQuery,
  useLazyGetNotificationsQuery,
  useLazyGetNotificationQuery,
} = notificationApi;
