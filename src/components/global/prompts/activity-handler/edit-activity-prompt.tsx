import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import React, { Dispatch, SetStateAction, useState } from "react";
import EditActivity from "./edit-activity";

type Props = {
  activityId: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

export default function EdiActivityPrompt({
  activityId,
  open,
  setOpen,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Edit Activity</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[500px]">
          <EditActivity setDialogOpen={setOpen} activityId={activityId} />
        </div>
      </DialogContent>
    </Dialog>
  );
}
