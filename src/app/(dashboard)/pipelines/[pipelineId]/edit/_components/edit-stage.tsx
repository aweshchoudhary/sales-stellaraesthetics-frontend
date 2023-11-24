import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useDeleteStageMutation,
  useUpdateStageMutation,
} from "@/redux/services/stage.api";
import { StageInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { DraggableProvided } from "react-beautiful-dnd";
import { toast } from "react-toastify";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import AddStage from "@/components/global/prompts/add-stage-prompt";
import * as yup from "yup";
import { useFormik } from "formik";
import { useCreateStageMutation } from "@/redux/services/stage.api";
import AddStagePrompt from "@/components/global/prompts/add-stage-prompt";
import DeletePrompt from "@/components/prompts/DeletePrompt";

type Props = {
  provided: DraggableProvided;
  stage: StageInterface;
  pipelineId: string;
};

export default function EditStage({ provided, stage, pipelineId }: Props) {
  const [
    updateStage,
    { isLoading: isUpdateLoading, isSuccess: isUpdateSuccess },
  ] = useUpdateStageMutation();
  const [deleteStage, deleteStates] = useDeleteStageMutation();

  const [addPromptOpen, setAddPromptOpen] = useState<boolean>(false);
  const [deletePromptOpen, setDeletePromptOpen] = useState<boolean>(false);
  const [stageName, setStageName] = useState<string>(stage.name);

  async function handleUpdateStage() {
    await updateStage({ name: stageName, stageId: stage._id });
  }
  async function handleDeleteStage() {
    await deleteStage({ position: stage.position, pipelineId });
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted && deleteStates.isSuccess) {
      toast.success("Note Updated Successfully");
    }
    if (deleteStates.isError) {
      toast.error("Something went wrong. Try again");
      console.log(deleteStates.error);
    }
    return () => {
      isMounted = false;
    };
  }, [deleteStates.isSuccess, deleteStates.error, deleteStates.isError]);

  useEffect(() => {
    if (isUpdateSuccess) toast.success("Stage has been updated");
  }, [isUpdateSuccess]);

  return (
    <div
      className={
        "border-r shrink-0 relative bg-background flex flex-col justify-between w-1/3 h-[calc(100vh-125px)]"
      }
      ref={provided.innerRef}
      {...provided.draggableProps}
    >
      <div>
        <header
          {...provided.dragHandleProps}
          className="py-3 px-5 hover:cursor-move bg-primary text-white"
        >
          <h2 className="font-medium capitalize">{stage.name}</h2>
        </header>
        <div className="p-5">
          <div className="input-group">
            <label htmlFor="name" className="mb-1 block">
              Name
            </label>
            <Input
              type="text"
              value={stageName}
              onChange={(e) => setStageName(e.target.value)}
              placeholder={stageName}
            />
          </div>
          <div className="flex mt-5 gap-2">
            <Button
              disabled={
                stage.name === stageName ||
                deleteStates.isLoading ||
                isUpdateLoading
              }
              variant="outline"
            >
              Cancel
            </Button>
            <Button
              onClick={handleUpdateStage}
              disabled={
                stage.name === stageName ||
                deleteStates.isLoading ||
                isUpdateLoading
              }
            >
              {deleteStates.isLoading || isUpdateLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </div>
      </div>
      <footer className="p-5 border-t">
        <DeletePrompt
          open={deletePromptOpen}
          setOpen={setDeletePromptOpen}
          deleteStates={deleteStates}
          handleDelete={handleDeleteStage}
          name={stage.name}
        />
      </footer>
      <Button
        variant="outline"
        onClick={() => setAddPromptOpen(true)}
        className="rounded-full absolute top-1 z-30 bg-accent -right-[15px]"
        size="icon"
      >
        <Icon icon={"uil:plus"} className="text-xl" />
      </Button>
      <AddStagePrompt
        setOpen={setAddPromptOpen}
        open={addPromptOpen}
        pipelineId={pipelineId}
        position={stage.position + 1}
      />
    </div>
  );
}
