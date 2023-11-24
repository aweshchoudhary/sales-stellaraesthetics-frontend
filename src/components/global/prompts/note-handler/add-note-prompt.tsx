import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import AddNote from "./add-note";
import { PipelineInterface, SelectInterface } from "@/types/interface";

type Props = {
  pipeline: PipelineInterface;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  contacts: SelectInterface[];
  deals: SelectInterface[];
};

export default function EdiActivityPrompt({
  pipeline,
  open,
  setOpen,
  contacts,
  deals,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Add Note</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[500px]">
          <AddNote
            setDialogOpen={setOpen}
            pipelineId={pipeline._id}
            contacts={contacts}
            deals={deals}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
