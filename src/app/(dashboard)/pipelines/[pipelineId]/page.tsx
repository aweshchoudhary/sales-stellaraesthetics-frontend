"use client";
import GoBack from "@/components/global/GoBack";
import React, { useState } from "react";
import Stages from "../_components/stages";
import { useParams, usePathname } from "next/navigation";
import { useGetPipelineQuery } from "@/redux/services/pipelineApi";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Icon } from "@iconify/react";
import Link from "next/link";
import AddNewDeal from "@/components/global/prompts/new-deal/add-deal-prompt";

type Props = {};

export default function PipelinPage({}: Props) {
  const { pipelineId } = useParams();
  const { data, isLoading, isFetching, isSuccess } = useGetPipelineQuery({
    id: `${pipelineId}`,
  });

  const [addNewDealPromptOpen, setAddNewDealPromptOpen] = useState(false);

  if (isSuccess)
    return (
      <div className="flex flex-col h-full">
        <section className="px-5 py-3 border-b">
          <header className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <GoBack />
              <h1 className="text-lg font-semibold">{data.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <Button onClick={() => setAddNewDealPromptOpen(true)}>
                <Icon icon="bi:plus" className="text-2xl mr-1" />
                Deal
              </Button>
              <ActionMenuDropDown />
            </div>
          </header>
        </section>
        <section className="flex-1">
          <Stages pipeline={data} />
        </section>
        <AddNewDeal
          open={addNewDealPromptOpen}
          setOpen={setAddNewDealPromptOpen}
          pipeline={data}
        />
      </div>
    );
}

const ActionMenuDropDown = () => {
  const pathname = usePathname();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Icon icon="solar:alt-arrow-down-bold" className="text-lg" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="mr-4">
        <DropdownMenuLabel>Action</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem>
          <Link href={pathname + "/edit"} className="flex items-center gap-2">
            <Icon icon="solar:pen-linear" className="text-lg" />
            <span>Edit Pipeline</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem>
          <Link href={pathname + "/manage"} className="flex items-center gap-2">
            <Icon
              icon="solar:users-group-rounded-outline"
              className="text-lg"
            />
            <span>Pipeline Users</span>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
