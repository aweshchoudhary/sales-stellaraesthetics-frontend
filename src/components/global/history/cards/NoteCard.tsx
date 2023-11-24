"use client";
import { Badge } from "@/components/ui/badge";
import { NoteInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useState } from "react";
import NoteEditPrompt from "@/components/global/prompts/note-handler/edit-note-prompt";

type Props = {
  note: NoteInterface;
};

export default function NoteCard({ note }: Props) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  return (
    <div className="flex gap-3">
      <div className="w-[50px] h-[50px] flex items-center justify-center bg-accent rounded border">
        <Icon icon={"ph:notepad-light"} className="text-2xl" />
      </div>
      <div className="flex-1 bg-accent h-full p-4 border rounded">
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: note.noteBody }}
        ></p>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant={"success"}>Added</Badge>
          <p>{moment(note.createdAt).fromNow()}</p>
          <p className="flex items-center gap-2">
            <Icon icon="solar:user-outline" className="text-lg" />{" "}
            {note.creator.fullname}
          </p>
          <button onClick={() => setUpdateDialogOpen(true)}>update</button>
        </div>
      </div>
      <NoteEditPrompt
        open={updateDialogOpen}
        setOpen={setUpdateDialogOpen}
        noteId={note.id}
      />
    </div>
  );
}
