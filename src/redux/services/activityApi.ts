import { mainApi } from "./mainApi";

export const activityApi = mainApi.injectEndpoints({
  endpoints: (builder: any) => ({
    createActivity: builder.mutation({
      query: (data: any) => ({
        url: "/activities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activities"],
    }),
    getActivity: builder.query({
      query: (data: any) => ({
        url: "/activities/" + data.id,
        params: data.params,
      }),
      providesTags: ["activities"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getActivities: builder.query({
      query: (params: any) => ({
        url: "/activities",
        params,
      }),
      providesTags: ["activities"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateActivity: builder.mutation({
      query: (data: any) => ({
        url: "/activities/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["activities"],
    }),
    deleteActivity: builder.mutation({
      query: (id: any) => ({
        url: "/activities/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["activities"],
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
