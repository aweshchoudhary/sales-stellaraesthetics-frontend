import { GetArgInterface, PipelineInterface } from "@/types/interface";
import { mainApi } from "./main.api";

export const pipelineApi = mainApi.injectEndpoints({
  endpoints: (builder) => ({
    createPipeline: builder.mutation({
      query: (data) => ({
        url: "/pipelines/",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["pipelines"],
    }),
    verifyPipelineUser: builder.query<any, string>({
      query: (pipelineId) => "/pipelines/verify-user/" + pipelineId,
    }),
    getPipeline: builder.query<PipelineInterface, GetArgInterface>({
      query: (data) => ({
        url: "/pipelines/" + data.id,
        params: data.params,
      }),
      providesTags: ["pipelines"],
      transformResponse: (response: any) => {
        return response.data;
      },
    }),
    getPipelines: builder.query({
      query: (params) => ({
        url: "/pipelines/",
        params,
      }),
      providesTags: ["pipelines"],
    }),
    updatePipeline: builder.mutation({
      query: (data) => ({
        url: "/pipelines/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["pipelines"],
    }),
    assignPipelineUser: builder.mutation({
      query: (data) => ({
        url: "/pipelines/assign-user/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["pipelines"],
    }),
    removePipelineUser: builder.mutation({
      query: (data) => ({
        url: "/pipelines/remove-user/" + data.id,
        method: "PUT",
        body: data.update,
      }),
      invalidatesTags: ["pipelines"],
    }),
    transferPipelineOwnership: builder.mutation({
      query: (data) => ({
        url: "/pipelines/change-ownership/" + data.id,
        method: "PUT",
        body: data.newOwnerId,
      }),
      invalidatesTags: ["pipelines"],
    }),
    deletePipeline: builder.mutation({
      query: (id) => ({
        url: "/pipelines/" + id,
        method: "DELETE",
      }),
      invalidatesTags: ["pipelines"],
    }),
  }),
});

export const {
  useGetPipelineQuery,
  useCreatePipelineMutation,
  useUpdatePipelineMutation,
  useDeletePipelineMutation,
  useLazyGetPipelineQuery,
  useLazyGetPipelinesQuery,
  useGetPipelinesQuery,
  useVerifyPipelineUserQuery,
  useLazyVerifyPipelineUserQuery,
  useAssignPipelineUserMutation,
  useRemovePipelineUserMutation,
  useTransferPipelineOwnershipMutation,
} = pipelineApi;
