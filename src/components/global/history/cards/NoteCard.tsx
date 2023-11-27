"use client";
import { Badge } from "@/components/ui/badge";
import { NoteInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useEffect, useState } from "react";
import NoteEditPrompt from "@/components/global/prompts/note-handler/edit-note-prompt";
import app, { auth } from "@/lib/fireabase";
import { getAuth } from "firebase/auth";

type Props = {
  note: NoteInterface;
};

export default function NoteCard({ note }: Props) {
  const [updateDialogOpen, setUpdateDialogOpen] = useState(false);
  useEffect(() => {
    const fetchNoteCreatorDetails = async () => {
      await getAuth(app)
        .getUser(note.creator)
        .then((userRecord) => {
          // See the UserRecord reference doc for the contents of userRecord.
          console.log(`Successfully fetched user data: ${userRecord.toJSON()}`);
        })
        .catch((error: any) => {
          console.log("Error fetching user data:", error);
        });
    };
    fetchNoteCreatorDetails();
  }, [note.creator]);

  return (
    <div className="flex gap-3">
      <div className="w-[50px] h-[50px] flex items-center justify-center bg-accent rounded border">
        <Icon icon={"ph:notepad-light"} className="text-2xl" />
      </div>
      <div className="flex-1 bg-accent h-full p-4 border rounded">
        <p
          className="text-sm"
          dangerouslySetInnerHTML={{ __html: note.note }}
        ></p>
        <div className="mt-2 flex items-center gap-4 text-sm text-muted-foreground">
          <Badge variant={"success"}>Added</Badge>
          <p>{moment(note.createdAt).fromNow()}</p>
          <p className="flex items-center gap-2">
            <Icon icon="solar:user-outline" className="text-lg" />{" "}
            {note.creator}
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
