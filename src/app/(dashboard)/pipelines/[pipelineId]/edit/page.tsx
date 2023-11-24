"use client";
import GoBack from "@/components/global/GoBack";
import { useGetPipelineQuery } from "@/redux/services/pipeline.api";
import { useParams } from "next/navigation";
import React from "react";
import EditStages from "./_components/edit-stages";

type Props = {};

export default function PipelineEdit({}: Props) {
  const { pipelineId }: any = useParams();

  const { data, isSuccess, error, isError } = useGetPipelineQuery({
    id: pipelineId,
  });

  if (isError) {
    return <p>{JSON.stringify(error)}</p>;
  }

  if (isSuccess)
    return (
      <div className="flex flex-col h-full">
        <section className="px-5 py-3 border-b shrink-0">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GoBack />
              <h1 className="text-lg font-semibold">
                Editing -{" "}
                <span className="text-muted-foreground">{data.name}</span>
              </h1>
            </div>
            <div className="flex items-center gap-2"></div>
          </header>
        </section>
        <EditStages pipeline={data} />
      </div>
    );
}
