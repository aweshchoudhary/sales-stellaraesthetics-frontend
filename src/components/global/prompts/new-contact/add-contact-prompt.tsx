import { PipelineInterface, SelectInterface } from "@/types/interface";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateContactMutation } from "@/redux/services/contact.api";
import { toast } from "react-toastify";
import {
  NewContactInterface,
  newContactInitialValues,
  newContactSchema,
} from "./utils";
import NewContactForm from "./new-contact-form";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pipeline: PipelineInterface;
  currentStage?: SelectInterface;
};

export default function AddNewContact({
  open,
  setOpen,
  pipeline,
  currentStage,
}: Props) {
  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>New Contact</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto h-[500px]">
          <AddNewContactForm
            open={open}
            setOpen={setOpen}
            pipeline={pipeline}
            currentStage={currentStage}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}

const AddNewContactForm = ({ setOpen }: Props) => {
  const [addContact, addContactStates] = useCreateContactMutation();

  const formik = useFormik({
    initialValues: newContactInitialValues,
    validationSchema: newContactSchema,
    onSubmit: (values: NewContactInterface) => handleSubmit(values),
  });

  const handleSubmit = async (values: NewContactInterface) => {
    await addContact(values);
    handleCancel();
  };

  const handleCancel = () => {
    formik.resetForm();
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && addContactStates.isSuccess) {
      formik.resetForm();
      toast.success("New Contact Added Successfully");
    }
    if (addContactStates.isError) {
      toast.error("Something went wrong. Please try again");
      console.log(addContactStates.error);
    }
    return () => {
      isMounted = false;
    };
  }, [
    addContactStates.isSuccess,
    formik.resetForm,
    addContactStates.error,
    addContactStates.isError,
  ]);

  return (
    <NewContactForm
      states={addContactStates}
      formik={formik}
      handleCancel={handleCancel}
    />
  );
};
