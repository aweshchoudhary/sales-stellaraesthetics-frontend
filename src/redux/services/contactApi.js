import { mainApi } from "./mainApi";

export const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query({
      query: (id) => "/contact/" + id,
      providesTags: ["contact"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getContacts: builder.query({
      query: (params) => ({
        url: "/contact/",
        params,
      }),
      providesTags: ["contact"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    createContact: builder.mutation({
      query: (data) => ({
        url: "/contact/",
        method: "POST",
        body: data,
      }),
      transformResponse: (response) => {
        return response.data;
      },
      invalidatesTags: ["contact"],
    }),
    updateContact: builder.mutation({
      query: (data) => ({
        url: "/contact/" + data.id,
        method: "PUT",
        body: data.body,
      }),
      invalidatesTags: ["contact"],
    }),
    deleteContact: builder.mutation({
      query: (id) => ({
        url: "/contact/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["contact"],
    }),
  }),
});

export const {
  useGetContactQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useLazyGetContactsQuery,
  useLazyGetContactQuery,
} = contactApi;
