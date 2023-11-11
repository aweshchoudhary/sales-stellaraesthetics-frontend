import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction } from "react";
import EditNote from "./edit-note";

type Props = {
  noteId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EdiActivityPrompt({ noteId, open, setOpen }: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px]">
          <EditNote setDialogOpen={setOpen} noteId={noteId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
