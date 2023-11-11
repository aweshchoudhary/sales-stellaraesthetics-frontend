import { FileInterface } from "@/types/interface";
import React from "react";
import FileCard from "./cards/FileCard";

type Props = {
  files: any;
};

export default function FilesTab({ files }: Props) {
  if (files.isLoading) return <p>Loading...</p>;

  if (files.isSuccess)
    return files.data.length ? (
      <ul className="flex flex-col gap-2">
        {files.data.map((file: FileInterface, index: number) => (
          <li key={index}>
            <FileCard file={file} />
          </li>
        ))}
      </ul>
    ) : (
      <p className="text-center">No Files to show</p>
    );
}
