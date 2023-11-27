import { mainApi } from "./main.api";

export const labelApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createLabel: builder.mutation({
      query: (data) => ({
        url: "/labels/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["label"],
    }),
    getLabel: builder.query({
      query: (id) => "/labels/" + id,
      providesTags: ["label"],
      transformResponse: (res: any) => {
        return res.data;
      },
    }),
    getLabels: builder.query({
      query: () => "/labels/",
      providesTags: ["label"],
    }),
    updateLabel: builder.mutation({
      query: (data) => ({
        url: "/labels/" + data.id,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["label"],
    }),
    deleteLabel: builder.mutation({
      query: (id) => ({
        url: "/labels/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["label"],
    }),
  }),
});

export const {
  useGetLabelQuery,
  useLazyGetLabelQuery,
  useLazyGetLabelsQuery,
  useCreateLabelMutation,
  useDeleteLabelMutation,
  useGetLabelsQuery,
  useUpdateLabelMutation,
} = labelApi;
