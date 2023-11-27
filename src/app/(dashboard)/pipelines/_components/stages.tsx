"use client";
import { useGetStagesQuery } from "@/redux/services/stage.api";
import React, { useEffect, useState } from "react";
import { DragDropContext } from "react-beautiful-dnd";
import Stage from "./stage";
import { PipelineInterface, StageInterface } from "@/types/interface";
import AddStagePrompt from "@/components/global/prompts/add-stage-prompt";
import { Button } from "@/components/ui/button";
import { useUpdateDealStageMutation } from "@/redux/services/deal.api";
import { selectCurrentUser } from "@/redux/features/auth.slice";
import { useSelector } from "react-redux";
import { User } from "firebase/auth";

type Props = {
  pipeline: PipelineInterface;
};

export default function Stages({ pipeline }: Props) {
  const [stages, setStages] = useState({});
  const { data, isLoading, isFetching, isSuccess, isError, error } =
    useGetStagesQuery({
      filters: JSON.stringify([{ id: "pipelineId", value: pipeline.id }]),
      sort: JSON.stringify([{ id: "position", desc: false }]),
      populate: JSON.stringify({ deals: true }),
    });

  const [updateDealStage, dealUpdateStatus] = useUpdateDealStageMutation();
  const loggedUser: User | null = useSelector(selectCurrentUser);

  const [newStagePromptOpen, setNewStagePromptOpen] = useState<boolean>(false);

  const onDragEnd = async (result: any, stages: any, setStages: any) => {
    if (!result.destination) return;

    const { source, destination, draggableId } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = stages[source.droppableId];
      const destColumn = stages[destination.droppableId];
      const sourceItems = [...sourceColumn.deals];
      const destItems = [...destColumn.deals];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setStages({
        ...stages,
        [source.droppableId]: {
          ...sourceColumn,
          deals: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          deals: destItems,
        },
      });
      await updateDealStage({
        dealId: draggableId,
        prevStageId: source.droppableId,
        newStageId: destination.droppableId,
        updator: loggedUser,
      });
    }
  };

  useEffect(() => {
    if (data?.data?.length) {
      data?.data?.forEach((stage: StageInterface) => {
        setStages((prev) => ({
          ...prev,
          [stage.id]: {
            ...stage,
          },
        }));
      });
    }
  }, [data]);

  return (
    <div className="flex overflow-x-auto w-full h-full">
      <DragDropContext
        onDragEnd={(result: any) => onDragEnd(result, stages, setStages)}
      >
        {Object.entries(stages).length ? (
          Object.entries(stages).map(([stageId, stage], index) => {
            return (
              <Stage
                key={index}
                stageId={stageId}
                stage={stage}
                pipeline={pipeline}
              />
            );
          })
        ) : (
          <div className="p-5">
            No stages has been added yet.{" "}
            <Button variant="link" onClick={() => setNewStagePromptOpen(true)}>
              Add Stage
            </Button>
          </div>
        )}
      </DragDropContext>
      <AddStagePrompt
        position={0}
        pipelineId={pipeline.id}
        open={newStagePromptOpen}
        setOpen={setNewStagePromptOpen}
      />
    </div>
  );
}
