import React from "react";
import { Draggable } from "react-beautiful-dnd";
import DealCard from "./deal-card";

type Props = {
  dealId: string;
  index: number;
};

export default function Card({ dealId, index }: Props) {
  return (
    <div>
      <Draggable key={dealId} draggableId={dealId} index={index}>
        {(provided) => {
          return (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <DealCard dealId={dealId} />
            </div>
          );
        }}
        {/* {(provided) => {
          return loggedUser.role === "member" ? (
            <div ref={provided.innerRef}>
              <DealCard dealId={dealId} setColumnInfo={setColumnInfo} />
            </div>
          ) : (
            <div
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <DealCard dealId={dealId} setColumnInfo={setColumnInfo} />
            </div>
          );
        }} */}
      </Draggable>
    </div>
  );
}
