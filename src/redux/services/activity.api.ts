import { ApiReq } from "@/types/interface";
import { mainApi } from "./main.api";

export const activityApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createActivity: builder.mutation<any, any>({
      query: (data) => ({
        url: "/activities",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["activity"],
    }),
    getActivity: builder.query<any, ApiReq>({
      query: (data: any) => ({
        url: "/activities/" + data.id,
        params: data.params,
      }),
      providesTags: ["activity"],
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getActivities: builder.query<any[], any>({
      query: (params) => ({
        url: "/activities",
        params,
      }),
      providesTags: ["activity"],
    }),
    updateActivity: builder.mutation({
      query: (data: any) => ({
        url: "/activities/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["activity"],
    }),
    deleteActivity: builder.mutation({
      query: (id: any) => ({
        url: "/activities/" + id,
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
