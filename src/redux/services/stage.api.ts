import { mainApi } from "./main.api";

export const stageApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createStage: builder.mutation({
      query: (data) => ({
        url: "/stages",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["stage"],
    }),
    getStages: builder.query({
      query: (params) => ({
        url: "/stages",
        params,
      }),
      providesTags: ["stage"],
    }),
    getStage: builder.query({
      query: (id) => "/stages/" + id,
      providesTags: ["stage"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    updateStage: builder.mutation({
      query: (data) => ({
        url: "/stages/" + data.stageId,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["stage"],
    }),
    reorderStage: builder.mutation({
      query: (stage) => ({
        url: "/stages/reorder/" + stage.pipelineId,
        method: "PUT",
        body: stage.data,
      }),
      invalidatesTags: ["stage"],
    }),
    deleteStage: builder.mutation({
      query: (stage) => ({
        url: `/stages/${stage.id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["stage"],
    }),
  }),
});

export const {
  useGetStageQuery,
  useGetStagesQuery,
  useCreateStageMutation,
  useDeleteStageMutation,
  useUpdateStageMutation,
  useReorderStageMutation,
  useLazyGetStagesQuery,
} = stageApi;
