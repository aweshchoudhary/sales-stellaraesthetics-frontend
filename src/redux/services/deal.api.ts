import { mainApi } from "./main.api";

export const dealApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDeal: builder.mutation({
      query: (data) => ({
        url: "/deal/",
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
        url: "/deal/" + data.id,
        params: data.params,
      }),
      providesTags: ["deal"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getDeals: builder.query({
      query: (params) => ({
        url: "/deal/",
        params,
      }),
      providesTags: ["deal"],
    }),
    updateDeal: builder.mutation({
      query: (data) => ({
        url: "/deal/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["deal"],
    }),
    updateDealStage: builder.mutation({
      query: (data) => ({
        url: "/deal/",
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["deal", "stage"],
    }),
    deleteDeal: builder.mutation({
      query: (id) => ({
        url: "/deal/" + id,
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
