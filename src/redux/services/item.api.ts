import { mainApi } from "./main.api";

export const itemApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createItem: builder.mutation({
      query: (data) => ({
        url: "/item/create",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["item"],
    }),
    getItem: builder.query({
      query: (id) => "/item/get-item/" + id,
      providesTags: ["item"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getItems: builder.query({
      query: (params) => ({
        url: "/item/get-items/",
        params,
      }),
      providesTags: ["item"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateItem: builder.mutation({
      query: (data) => ({
        url: "/item/update/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["item"],
    }),
    deleteItem: builder.mutation({
      query: (id) => ({
        url: "/item/delete/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["item"],
    }),
  }),
});

export const {
  useGetItemQuery,
  useLazyGetItemQuery,
  useCreateItemMutation,
  useDeleteItemMutation,
  useUpdateItemMutation,
  useGetItemsQuery,
  useLazyGetItemsQuery,
} = itemApi;
