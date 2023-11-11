import { mainApi } from "./mainApi";

export const activityApi = mainApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createActivity: builder.mutation({
      query: (data: any) => ({
        url: "/api/activity/add",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activity"],
    }),
    getActivity: builder.query({
      query: (data: any) => ({
        url: "/api/activity/get-activity/" + data.id,
        params: data.params,
      }),
      providesTags: ["activity"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getActivities: builder.query({
      query: (params: any) => ({
        url: "/api/activity/get-activities/",
        params,
      }),
      providesTags: ["activity"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateActivity: builder.mutation({
      query: (data: any) => ({
        url: "/api/activity/update/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["activity"],
    }),
    deleteActivity: builder.mutation({
      query: (id: any) => ({
        url: "/api/activity/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["activity"],
    }),
  }),
});

export const {
  useGetActivityQuery,
  useLazyGetActivityQuery,
  useCreateActivityMutation,
  useDeleteActivityMutation,
  useUpdateActivityMutation,
  useGetActivitiesQuery,
  useLazyGetActivitiesQuery,
} = activityApi;
