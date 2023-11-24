import { mainApi } from "./main.api";

export const contactApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    getContact: builder.query<any, string>({
      query: (id) => `/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "contact", id }],
      transformResponse: (response: { data: any }) => {
        return response.data;
      },
    }),
    getContacts: builder.query<any[], Record<string, any>>({
      query: (params) => ({
        url: "/contact/",
        params,
      }),
      providesTags: ["contact"],
    }),
    createContact: builder.mutation<any, any>({
      query: (data) => ({
        url: "/contact/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: [{ type: "contact" }],
    }),
    updateContact: builder.mutation<any, any>({
      query: (data) => ({
        url: `/contact/${data.id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [{ type: "contact" }],
    }),
    deleteContact: builder.mutation<void, string>({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [{ type: "contact" }],
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
