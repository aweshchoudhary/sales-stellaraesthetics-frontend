import { mainApi } from "./main.api";

export const dealItemApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createDealItem: builder.mutation({
      query: (data) => ({
        url: "/deal-items/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["dealItem"],
    }),
    getDealItem: builder.query({
      query: ({ params, id }) => ({
        url: "/deal-items/get-deal-item/" + id,
        params,
      }),
      providesTags: ["dealItem"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getDealProductsServices: builder.query({
      query: (params) => ({
        url: "/deal-items/get-deal-items/",
        params,
      }),
      providesTags: ["dealItem"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateDealItem: builder.mutation({
      query: (data) => ({
        url: "/deal-items/update/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["dealItem"],
    }),
    deleteDealItem: builder.mutation({
      query: (id) => ({
        url: "/deal-items/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["dealItem"],
    }),
  }),
});

export const {
  useGetDealItemQuery,
  useLazyGetDealItemQuery,
  useCreateDealItemMutation,
  useDeleteDealItemMutation,
  useUpdateDealItemMutation,
  useGetDealProductsServicesQuery,
  useLazyGetDealProductsServicesQuery,
} = dealItemApi;
