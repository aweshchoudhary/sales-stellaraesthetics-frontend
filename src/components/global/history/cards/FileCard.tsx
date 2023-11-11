"use client";
import DeletePrompt from "@/components/prompts/DeletePrompt";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import BASE_URL from "@/lib/baseurl";
import { useDeleteFileMutation } from "@/redux/services/fileApi";
import { FileInterface } from "@/types/interface";
import { Icon } from "@iconify/react";
import moment from "moment";
import React, { useState } from "react";
import { toast } from "react-toastify";
import { Tooltip } from "react-tooltip";

type Props = {
  file: FileInterface;
};

export default function FileCard({ file }: Props) {
  const [deletePromptOpen, setDeletePromptOpen] = useState(false);
  const [deleteFile, deleteStates] = useDeleteFileMutation();

  function fileSize() {
    const sufixes = ["B", "KB", "MB", "GB"];
    const bytes = Number(file.size);
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return `${(bytes / Math.pow(1024, i)).toFixed(2)}${sufixes[i]}`;
  }

  async function handleDownloadFile() {
    await fetch(BASE_URL + "/file/download/" + file.name)
      .then((response) => response.blob())
      .then((blob) => {
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = file.name;
        a.click();

        toast.success("File Downloaded");
      });
  }

  async function handleDeleteFile() {
    await deleteFile(file._id);
  }

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      toast.success(
        activity.completed_on
          ? "Activity marked as uncompleted"
          : "Activity marked as completed"
      );
    }
    if (isError) {
      toast.error("Got error while marking Activity");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, error, isError, activity.completed_on]);

  return (
    <div className="flex gap-3">
      <div className="w-[50px] h-[50px] flex items-center justify-center bg-accent rounded border">
        <Icon icon={"solar:file-outline"} className="text-xl" />
      </div>
      <div className="flex-1 bg-accent h-full p-4 border rounded">
        <p className="text-sm">
          {fileSize()} - {file.name}
        </p>
        <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
          <Badge variant={"success"}>Added</Badge>
          <p>{moment(file.createdAt).fromNow()}</p>
          <p className="flex items-center gap-2">
            <Icon icon="solar:user-outline" className="text-lg" />{" "}
            {file.uploader.fullname}
          </p>
          <Button
            className="p-0"
            size="icon"
            id="download-tooltip"
            variant={"ghost"}
            onClick={handleDownloadFile}
          >
            <Icon icon="solar:download-outline" className="text-xl" />
          </Button>
          <Tooltip id="download-tooltip" content="Download File" />
          <Button
            id="delete-tooltip"
            variant="ghost"
            className="p-0 hover:text-destructive"
            size={"icon"}
            onClick={() => setDeletePromptOpen(true)}
          >
            <Icon icon="uil:trash" className="text-xl" />
          </Button>
          <Tooltip id="delete-tooltip" content="Delete File" />
        </div>
      </div>
      <DeletePrompt
        deleteStates={deleteStates}
        handleDelete={handleDeleteFile}
        name={file.name}
        open={deletePromptOpen}
        setOpen={setDeletePromptOpen}
      />
    </div>
  );
}
