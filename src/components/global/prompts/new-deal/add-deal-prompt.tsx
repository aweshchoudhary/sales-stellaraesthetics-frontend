import { PipelineInterface, SelectInterface } from "@/types/interface";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useCreateDealMutation } from "@/redux/services/dealApi";
import { toast } from "react-toastify";
import { NewDealInterface, newDealInitialValues, newDealSchema } from "./utils";
import NewDealForm from "./new-deal-form";
import ContactSelect from "@/components/global/select/ContactSelect";
import { Button } from "@/components/ui/button";
import { useCreateContactMutation } from "@/redux/services/contactApi";
import {
  NewContactInterface,
  newContactInitialValues,
  newContactSchema,
} from "../new-contact/utils";
import NewContactForm from "../new-contact/new-contact-form";
import { Icon } from "@iconify/react";
import { cn } from "@/lib/utils";
type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  pipeline: PipelineInterface;
  currentStage?: SelectInterface;
};

export default function AddNewDeal({
  open,
  setOpen,
  pipeline,
  currentStage,
}: Props) {
  const [step, setStep] = useState<number>(1);

  const [addDeal, addDealStates] = useCreateDealMutation();
  const [newContactFormOpen, setNewContactFormOpen] = useState(false);
  const [selectedContact, setSelectedContact] = useState<SelectInterface[]>([]);

  const formik = useFormik({
    initialValues: newDealInitialValues,
    validationSchema: newDealSchema,
    onSubmit: (values: NewDealInterface) => handleSubmit(values),
  });

  const handleSubmit = async (values: NewDealInterface) => {
    await addDeal(values);
    handleCancel();
  };

  const handleCancel = () => {
    formik.resetForm();
    setStep(1);
    setOpen(false);
    setNewContactFormOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && addDealStates.isSuccess) {
      formik.resetForm();
      toast.success("New Deal Added Successfully");
    }
    if (addDealStates.isError) {
      toast.error("Something went wrong. Please try again");
      console.log(addDealStates.error);
    }
    return () => {
      isMounted = false;
    };
  }, [
    addDealStates.isSuccess,
    formik.resetForm,
    addDealStates.error,
    addDealStates.isError,
  ]);

  useEffect(() => {
    selectedContact.length &&
      formik.setFieldValue(
        "contacts",
        selectedContact.map((contact) => contact.value)
      );
  }, [selectedContact]);

  return (
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>New Deal</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px]">
          <div className="px-10 py-5 border-b flex items-center gap-3">
            <div>
              <button
                className="flex items-center gap-2"
                onClick={() => setStep(1)}
              >
                <div
                  className={cn(
                    "h-[30px] mx-auto w-[30px] flex items-center justify-center rounded-full",
                    step === 1
                      ? "bg-primary text-white"
                      : "bg-accent text-muted-foreground border"
                  )}
                >
                  {step !== 1 ? <Icon icon="mdi:tick" /> : <span>1</span>}
                </div>
                <p
                  className={cn(
                    "text-sm",
                    step == 1 ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  Select Contacts
                </p>
              </button>
            </div>
            <div className="line flex-1">
              <div className="h-[1px] w-full bg-foreground"></div>
            </div>
            <div>
              <button
                className="flex items-center gap-2"
                onClick={() => setStep(2)}
                disabled={!selectedContact.length}
              >
                <div
                  className={cn(
                    "h-[30px] mx-auto w-[30px] flex items-center justify-center rounded-full",
                    step === 2
                      ? "bg-primary text-white"
                      : "bg-accent text-muted-foreground border"
                  )}
                >
                  <Icon icon="uil" />
                  <span>2</span>
                </div>
                <p
                  className={cn(
                    "text-sm",
                    step == 2 ? "text-foreground" : "text-muted-foreground"
                  )}
                >
                  Add Deal
                </p>
              </button>
            </div>
          </div>
          {step === 1 ? (
            <>
              <div>
                <div className="p-5">
                  <ContactSelect
                    setSelectedData={setSelectedContact}
                    selectedData={selectedContact}
                  />
                </div>
                {!newContactFormOpen && (
                  <div className="flex px-5 py-4 border-t justify-between items-center">
                    <Button
                      variant="outline"
                      onClick={() => setNewContactFormOpen(true)}
                    >
                      New Customer
                    </Button>
                    <div className="flex gap-2">
                      <Button
                        onClick={() => {
                          formik.resetForm();
                          setOpen(false);
                        }}
                        variant="outline"
                      >
                        Cancel
                      </Button>
                      <Button
                        onClick={() => setStep(2)}
                        disabled={!selectedContact.length}
                      >
                        Continue
                      </Button>
                    </div>
                  </div>
                )}
              </div>
              <AddNewContactModel
                open={newContactFormOpen}
                setOpen={setNewContactFormOpen}
                setSelectedContact={setSelectedContact}
              />
            </>
          ) : null}

          {step === 2 ? (
            <NewDealForm
              pipeline={pipeline}
              states={addDealStates}
              formik={formik}
              setOpen={setOpen}
              selectedCurrentStage={currentStage}
              handleCancel={handleCancel}
            />
          ) : null}
        </div>
      </DialogContent>
    </Dialog>
  );
}

const AddNewContactModel = ({
  open,
  setOpen,
  setSelectedContact,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setSelectedContact: Dispatch<SetStateAction<SelectInterface[]>>;
}) => {
  const [addContact, addContactStates] = useCreateContactMutation();

  const formik = useFormik({
    initialValues: newContactInitialValues,
    validationSchema: newContactSchema,
    onSubmit: (values: NewContactInterface) => handleSubmit(values),
  });

  const handleSubmit = async (values: NewContactInterface) => {
    const response = await addContact(values);
    const res: any = response;
    setSelectedContact((prev) => [
      ...prev,
      { label: res?.data?.contactPerson, value: res?.data?._id },
    ]);
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
  return open ? (
    <NewContactForm
      formik={formik}
      states={addContactStates}
      handleCancel={handleCancel}
    />
  ) : null;
};
