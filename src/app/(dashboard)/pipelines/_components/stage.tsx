"use client";
import React, { useState } from "react";
import { Droppable } from "react-beautiful-dnd";
import Card from "./card";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import AddNewDeal from "@/components/global/prompts/new-deal/add-deal-prompt";
import {
  DealInterface,
  PipelineInterface,
  StageInterface,
} from "@/types/interface";

type Props = {
  stageId: string;
  stage: StageInterface | any;
  pipeline: PipelineInterface;
};

export default function Stage({ stageId, stage, pipeline }: Props) {
  const [newDealPromptOpen, setNewDealPromptOpen] = useState<boolean>(false);
  return (
    <div className="w-1/3 flex-col flex shrink-0 h-full">
      <header className="px-3 py-1 border-b flex justify-between items-center bg-primary text-primary-foreground">
        <h2 className="text-sm">{stage?.name}</h2>
        <Button
          variant="outline"
          className="hover:bg-white hover:text-primary border-white"
          size="sm"
          onClick={() => setNewDealPromptOpen(true)}
        >
          <Icon icon="uil:plus" className="text-xl" />
        </Button>
      </header>
      <div className="w-full flex-1 border-r">
        <Droppable droppableId={stageId} key={stageId}>
          {(provided, snapshot) => {
            return (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className={`w-full p-2 h-full ${
                  snapshot.isDraggingOver ? "bg-accent" : ""
                }`}
              >
                {stage?.deals?.length
                  ? stage.deals.map((deal: DealInterface, index: number) => {
                      return (
                        <Card dealId={deal.id} index={index} key={index} />
                      );
                    })
                  : null}
              </div>
            );
          }}
        </Droppable>
      </div>
      <AddNewDeal
        open={newDealPromptOpen}
        setOpen={setNewDealPromptOpen}
        currentStage={{ label: stage.name, value: stage.id }}
        pipeline={pipeline}
      />
    </div>
  );
}
