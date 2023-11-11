import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import { PipelineInterface, SelectInterface } from "@/types/interface";
import AddActivity from "./add-activity";

type Props = {
  pipeline?: PipelineInterface;
  currentStage?: SelectInterface;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  dateSelectRange?: {
    startDateTime: Date;
    endDateTime: Date;
  };
};

export default function AddActivityPrompt({
  open,
  setOpen,
  dateSelectRange,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>New Activity</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[500px]">
          <AddActivity
            setDialogOpen={setOpen}
            dateSelectRange={dateSelectRange}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
