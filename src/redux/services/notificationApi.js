import { mainApi } from "./mainApi";

export const notificationApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createNotification: builder.mutation({
      query: (data) => ({
        url: "/api/notification/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["notification"],
    }),
    getNotification: builder.query({
      query: (data) => ({
        url: "/api/notification/get-notification/" + data.id,
        params: data.params,
      }),
      providesTags: ["notification"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getNotifications: builder.query({
      query: (params) => ({
        url: "/api/notification/get-notifications/",
        params,
      }),
      providesTags: ["notification"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    updateNotification: builder.mutation({
      query: (data) => ({
        url: "/api/notification/update/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["notification"],
    }),
    deleteNotification: builder.mutation({
      query: (id) => ({
        url: "/api/notification/delete/" + id,
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
