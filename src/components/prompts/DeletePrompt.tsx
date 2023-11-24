"use client";
import { Dispatch, SetStateAction, useEffect } from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Icon } from "@iconify/react";

type Props = {
  handleDelete: any;
  name: string;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  deleteStates: any;
};

export default function DeletePrompt({
  handleDelete,
  deleteStates,
  name,
  open,
  setOpen,
}: Props) {
  useEffect(() => {
    if (deleteStates.isSuccess) {
      setOpen(false);
    }
  }, [deleteStates?.isSuccess, setOpen]);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete {name} Stage?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete{" "}
            <span className="text-foreground">{name}</span>. This action cannot
            be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>
            Cancel
          </AlertDialogCancel>
          <AlertDialogAction onClick={handleDelete}>
            {deleteStates.isLoading ? (
              "Deleting..."
            ) : (
              <>
                <Icon
                  icon="solar:trash-bin-trash-outline"
                  className="text-lg mr-2"
                />
                <p>Delete</p>
              </>
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
