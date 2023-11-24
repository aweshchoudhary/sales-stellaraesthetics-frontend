import { mainApi } from "./mainApi";

export const labelApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createLabel: builder.mutation({
      query: (data) => ({
        url: "/label/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["label"],
    }),
    getLabel: builder.query({
      query: (id) => "/label/" + id,
      providesTags: ["label"],
      transformResponse: (res) => {
        return res.data;
      },
    }),
    getLabels: builder.query({
      query: () => "/label/",
      providesTags: ["label"],
      transformResponse: (res) => {
        return res.data;
      },
    }),
    updateLabel: builder.mutation({
      query: (data) => ({
        url: "/label/" + data.id,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["label"],
    }),
    deleteLabel: builder.mutation({
      query: (id) => ({
        url: "/label/" + id,
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
