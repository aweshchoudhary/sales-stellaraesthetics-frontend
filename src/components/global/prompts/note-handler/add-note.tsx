// Import statements
import { useFormik } from "formik";
import {
  AddProps,
  CreateNoteInterface,
  noteInitialValues,
  noteValidationSchema,
} from "./form-utils";
import { useCreateNoteMutation } from "@/redux/services/noteApi";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import NoteForm from "./note-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/authSlice";
import { SelectInterface, UserInterface } from "@/types/interface";

// Component for adding a new note
export default function AddNote({ pipelineId, contacts, deals }: AddProps) {
  // Get the logged-in user from Redux store
  const loggedUser: UserInterface = useSelector(selectCurrentUser);

  // Formik setup for managing form state and validation
  const formik = useFormik({
    initialValues: noteInitialValues,
    validationSchema: noteValidationSchema,
    onSubmit: (values: CreateNoteInterface) => handleSubmit(values),
  });

  // console.log(formik.values);

  // State to manage selected contacts and deals
  const [selectedContacts, setSelectedContacts] =
    useState<SelectInterface[]>(contacts);
  const [selectedDeals, setSelectedDeals] = useState<SelectInterface[]>(deals);

  // Mutation for creating a new note
  const [createNote, { isLoading, isSuccess, isError, error }] =
    useCreateNoteMutation();

  // Handle form submission
  const handleSubmit = async (values: CreateNoteInterface) => {
    await createNote({ ...values, creator: loggedUser._id });
  };
  // Handle cancel button click
  const handleCancel = () => {
    formik.resetForm();
    setSelectedContacts(contacts);
    setSelectedDeals(deals);
  };
  // Effect to show success/error toasts when the note is added or when an error occurs
  useEffect(() => {
    // Flag to check if the component is still mounted before updating state or showing toasts
    let isMounted = true;

    if (isMounted && isSuccess) {
      // If note is added successfully, reset the form and show success toast
      formik.resetForm();
      toast.success("Note Added Successfully");
    }

    if (isError) {
      // If there's an error, show an error toast and log the error to the console
      toast.error("Something went wrong. Please try again");
      console.log(error);
    }

    // Clean up function to set isMounted to false when the component is unmounted
    return () => {
      isMounted = false;
    };
  }, [isSuccess, isError, formik.resetForm, error]);

  // Render NoteForm component with the necessary props and formik state
  return (
    <NoteForm
      formik={formik}
      pipelineId={pipelineId}
      contacts={selectedContacts}
      setContacts={setSelectedContacts}
      deals={selectedDeals}
      setDeals={setSelectedDeals}
      states={{ isLoading }}
      handleCancel={handleCancel}
    />
  );
}
