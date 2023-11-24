// Import statements
import { useFormik } from "formik";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoteForm from "./note-form";
import {
  useLazyGetNoteQuery,
  useUpdateNoteMutation,
} from "@/redux/services/noteApi";
import {
  CreateNoteInterface,
  EditProps,
  noteInitialValues,
  noteValidationSchema,
} from "./form-utils";
import {
  ContactInterface,
  DealInterface,
  SelectInterface,
} from "@/types/interface";
import ModalLoader from "@/components/global/loaders/ModalLoader";

// Component for editing a note
export default function EditNote({ noteId, setDialogOpen }: EditProps) {
  // State variables for contacts and deals
  const [contacts, setContacts] = useState<SelectInterface[]>([]);
  const [deals, setDeals] = useState<SelectInterface[]>([]);

  // API queries and mutations
  const [getNote, states] = useLazyGetNoteQuery();
  const [updateNote, { isLoading, isSuccess, isError, error }] =
    useUpdateNoteMutation();

  // Formik setup for managing form state and validation
  const formik = useFormik({
    initialValues: noteInitialValues,
    validationSchema: noteValidationSchema,
    onSubmit: (values: CreateNoteInterface) => handleSubmit(values),
  });

  // Handle form submission
  const handleSubmit = async (values: CreateNoteInterface) => {
    await updateNote({ update: values, id: noteId });
  };

  // Handle cancel button click
  const handleCancel = () => {
    formik.resetForm();
    setDialogOpen && setDialogOpen(false);
  };

  // Effect to show success/error toasts when the note is updated or when an error occurs
  useEffect(() => {
    // Flag to check if the component is still mounted before updating state or showing toasts
    let isMounted = true;

    if (isMounted && isSuccess) {
      // If note is updated successfully, reset the form, show success toast, and close the dialog
      formik.resetForm();
      toast.success("Note Updated Successfully");
      handleCancel();
    }

    if (isError) {
      // If there's an error, show an error toast and log the error to the console
      toast.error("Something went wrong. Try again");
      console.log(error);
    }

    // Clean up function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [isSuccess, formik.resetForm, error, isError]);

  // Effect to fetch the note data and set the formik values
  useEffect(() => {
    if (noteId) {
      const handleGetNote = async (id: string) => {
        const res = await getNote({
          id: id,
          params: { populate: "deals contacts" },
        });

        // Destructure the response and format the deals and contacts data
        const { deals, contacts, ...note } = res.data;
        const formattedDeals = deals.map((deal: DealInterface) => ({
          label: deal.title,
          value: deal._id,
        }));
        const formattedContacts = contacts.map((contact: ContactInterface) => ({
          label: contact.contactPerson,
          value: contact._id,
        }));

        // Update the state variables and set formik values
        setContacts(formattedContacts);
        setDeals(formattedDeals);
        formik.setValues(note);
      };

      handleGetNote(noteId);
    }
  }, [noteId, getNote]);

  // Render ModalLoader while loading/fetching the note data
  if (states.isLoading || states.isFetching) return <ModalLoader />;

  // If the note data is successfully fetched, render NoteForm with the necessary props and formik state
  if (states.isSuccess) {
    const { data }: any = states;
    return (
      <NoteForm
        formik={formik}
        pipelineId={data?.pipelineId}
        contacts={contacts}
        setContacts={setContacts}
        deals={deals}
        setDeals={setDeals}
        states={{ isLoading }}
        handleCancel={handleCancel}
      />
    );
  }
}
