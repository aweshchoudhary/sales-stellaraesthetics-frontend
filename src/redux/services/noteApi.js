import { mainApi } from "./mainApi";

export const noteApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createNote: builder.mutation({
      query: (data) => ({
        url: "/note/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["note"],
    }),
    getNote: builder.query({
      query: (data) => ({
        url: "/note/" + data.id,
        params: data.params,
      }),
      providesTags: ["note"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    getNotes: builder.query({
      query: (params) => ({
        url: "/note/",
        params,
      }),
      providesTags: ["note"],
      transformResponse: (response) => {
        return response.data;
      },
    }),
    updateNote: builder.mutation({
      query: (data) => ({
        url: "/note/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["note"],
    }),
    deleteNote: builder.mutation({
      query: (id) => ({
        url: "/note/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["note"],
    }),
  }),
});

export const {
  useGetNoteQuery,
  useUpdateNoteMutation,
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useGetNotesQuery,
  useLazyGetNotesQuery,
  useLazyGetNoteQuery,
} = noteApi;
