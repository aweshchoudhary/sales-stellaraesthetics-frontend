"use client";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import FormInput from "@/components/form/FormInput";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { useCreateStageMutation } from "@/redux/services/stageApi";
import * as yup from "yup";
import { StageInterface } from "@/types/interface";

type AddStageInterface = Pick<StageInterface, "name">;

const initialValues: AddStageInterface = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Stage name is required"),
});

export default function AddStagePrompt({
  position = 0,
  open,
  setOpen,
  pipelineId,
}: {
  position: number;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pipelineId: string;
}) {
  const [addStage, { isLoading, isSuccess, isError, error }] =
    useCreateStageMutation();

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: AddStageInterface) => handleSubmit(values),
  });

  const handleSubmit = async (values: AddStageInterface) => {
    await addStage({ ...values, position, pipelineId });
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      toast.success("Stage Added Successfully");
      formik.resetForm();
      setOpen(false);
    }
    if (isError) {
      toast.error("Something went wrong. Try again");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, error, formik.resetForm, isError]);
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>Add New Stage</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-5">
              <FormInput name="name" title="Stage Name" formik={formik} />
            </div>
            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                disabled={isLoading}
                onClick={() => {
                  formik.resetForm();
                  setOpen(false);
                }}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Stage"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
