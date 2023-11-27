import { mainApi } from "./main.api";

export const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<any, string>({
      query: (id) => `/contacts/${id}`,
      providesTags: (result, error, id) => [{ type: "contact", id }],
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getContacts: builder.query<any, Record<string, any>>({
      query: (params) => ({
        url: "/contacts/",
        params,
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation<any, any>({
      query: (data) => ({
        url: "/contacts/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "contact" }],
    }),
    updateContact: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contacts/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "contact" }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contacts/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "contact" }],
    }),
  }),
});

export const {
  useGetContactQuery,
  useGetContactsQuery,
  useCreateContactMutation,
  useDeleteContactMutation,
  useUpdateContactMutation,
  useLazyGetContactsQuery,
  useLazyGetContactQuery,
} = contactApi;
