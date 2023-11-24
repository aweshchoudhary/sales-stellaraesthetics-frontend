"use client";
import {
  useGetStagesQuery,
  useReorderStageMutation,
} from "@/redux/services/stage.api";
import React from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import EditStage from "./edit-stage";
import { StageInterface } from "@/types/interface";

type Props = {
  pipeline: any;
};

export default function EditStages({ pipeline }: Props) {
  const {
    data = [],
    isLoading,
    isSuccess,
    isFetching,
    isError,
  } = useGetStagesQuery({
    filters: JSON.stringify([{ id: "pipelineId", value: pipeline._id }]),
    data: true,
    sort: JSON.stringify([{ id: "position", desc: false }]),
  });

  const [reorderStages, { isLoading: isStagesReorderLoading }] =
    useReorderStageMutation();

  const onDragComplete = async (result: any) => {
    if (!result.destination) return;
    const { destination, draggableId } = result;
    await reorderStages({
      pipelineId: pipeline._id,
      data: {
        stageId: draggableId,
        newPosition: destination.index,
      },
    });
  };

  return (
    <section
      className={`h-full bg-muted ${
        !isLoading && !isFetching && isSuccess && !isStagesReorderLoading
          ? "opacity-100"
          : "opacity-50"
      }`}
    >
      <DragDropContext onDragEnd={onDragComplete}>
        <div className="overflow-x-auto h-full w-full">
          <Droppable droppableId="drag-drop-list" direction="horizontal">
            {(provided) => (
              <div
                className="flex overflow-x-auto h-full"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {data?.data?.length ? (
                  data?.data?.map((stage: StageInterface) => (
                    <Draggable
                      key={stage._id}
                      draggableId={stage._id}
                      index={+stage.position}
                    >
                      {(provided) => (
                        <EditStage
                          provided={provided}
                          // length={data.length}
                          stage={stage}
                          pipelineId={pipeline._id}
                        />
                      )}
                    </Draggable>
                  ))
                ) : (
                  <section className="md:p-10 bg-bg w-full p-5">
                    <p>
                      No stages has been created yet.{" "}
                      <button
                        // onClick={() => setCreateStageModelDisplay(true)}
                        className="underline"
                      >
                        Create One
                      </button>
                    </p>
                  </section>
                )}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>
    </section>
  );
}
