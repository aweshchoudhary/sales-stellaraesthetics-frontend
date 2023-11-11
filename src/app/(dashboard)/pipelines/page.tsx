"use client";
import DataTable from "@/components/global/DataTable";
import GoBack from "@/components/global/GoBack";
import AddNewPipeline from "@/components/global/prompts/new-pipeline/add-pipeline-prompt";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useGetPipelinesQuery } from "@/redux/services/pipelineApi";
import { PipelineInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import React, { useMemo, useState } from "react";

type Props = {};

const ITEM_URL = "/pipelines/";

export default function PipelinesPage({}: Props) {
  const pipelines = useGetPipelinesQuery({
    data: true,
  });

  const columns = useMemo<ColumnDef<PipelineInterface>[]>(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={table.getIsAllPageRowsSelected()}
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="border-white"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "name",
        header: "Pipeline",
        cell: ({ row }) => (
          <Link href={ITEM_URL + row.original._id} className="capitalize">
            {row.getValue("name")}
          </Link>
        ),
        footer: (props) => props.column.id,
      },
      {
        accessorKey: "deals",
        header: "Total Deals",
        cell: ({ row }) => (
          <Link href={ITEM_URL + row.original._id} className="capitalize">
            {row.original.deals.length}
          </Link>
        ),
        footer: (props) => props.column.id,
      },
    ],
    []
  );

  const [newPipelinePromptOpen, setNewPipelinePromptOpen] =
    useState<boolean>(false);

  return (
    <>
      <section className="px-5 py-3 border-b">
        <header className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <GoBack />
            <h1 className="text-lg font-semibold">Pipelines</h1>
          </div>
          <div>
            <Button onClick={() => setNewPipelinePromptOpen(true)}>
              <Icon icon="bi:plus" className="text-2xl mr-1" />
              <span>Pipeline</span>
            </Button>
          </div>
        </header>
      </section>
      <section className="p-5">
        <DataTable
          columns={columns}
          data={{ ...pipelines, data: pipelines.data?.data }}
        />
      </section>
      <AddNewPipeline
        open={newPipelinePromptOpen}
        setOpen={setNewPipelinePromptOpen}
      />
    </>
  );
}
