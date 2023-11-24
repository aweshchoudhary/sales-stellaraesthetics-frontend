import { mainApi } from "./mainApi";

export const fileApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    addFile: builder.mutation({
      query: (data) => ({
        url: "/file/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["file"],
    }),
    getFiles: builder.query({
      query: (params) => ({
        url: "/file/",
        params,
      }),
      providesTags: ["contact"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    downloadFile: builder.query({
      query: (filename) => "/download/" + filename,
      providesTags: ["file"],
    }),
    deleteFile: builder.mutation({
      query: (id) => ({
        url: "/file/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["file"],
    }),
  }),
});

export const {
  useAddFileMutation,
  useDownloadFileQuery,
  useDeleteFileMutation,
  useGetFilesQuery,
  useLazyGetFilesQuery,
} = fileApi;
