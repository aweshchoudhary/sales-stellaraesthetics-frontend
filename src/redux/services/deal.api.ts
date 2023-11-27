import { mainApi } from "./main.api";

export const dealApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDeal: builder.mutation({
      query: (data) => ({
        url: "/deals/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response: any) => {
        return response.data;
      },
      invalidatesTags: ["deal"],
    }),
    getDeal: builder.query({
      query: (data) => ({
        url: "/deals/" + data.id,
        params: data?.filters ?? null,
      }),
      providesTags: ["deal"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getDeals: builder.query({
      query: (params) => ({
        url: "/deals/",
        params,
      }),
      providesTags: ["deal"],
    }),
    updateDeal: builder.mutation({
      query: (data) => ({
        url: "/deals/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["deal"],
    }),
    updateDealStage: builder.mutation({
      query: (data) => ({
        url: "/deals/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["deal", "stage"],
    }),
    deleteDeal: builder.mutation({
      query: (id) => ({
        url: "/deals/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["deal"],
    }),
  }),
});

export const {
  useGetDealQuery,
  useLazyGetDealQuery,
  useCreateDealMutation,
  useDeleteDealMutation,
  useUpdateDealMutation,
  useUpdateDealStageMutation,
  useGetDealsQuery,
  useLazyGetDealsQuery,
} = dealApi;
