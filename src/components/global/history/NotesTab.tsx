import { NoteInterface } from "@/types/interface";
import React from "react";
import NoteCard from "./cards/NoteCard";

type Props = {
  notes: any;
};

export default function NotesTab({ notes }: Props) {
  if (notes.isLoading) return <p>Loading...</p>;

  if (notes.isSuccess)
    return notes.data.length ? (
      <ul className="flex flex-col gap-2">
        {notes.data.map((note: NoteInterface, index: number) => (
          <li key={index}>
            <NoteCard note={note} />
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center">No Notes to show</p>
    );
}
