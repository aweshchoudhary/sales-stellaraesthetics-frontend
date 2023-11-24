import { useFormik } from "formik";
import { AddProps, CreateFileInterface } from "./form-utils";
import { useAddFileMutation } from "@/redux/services/file.api";
import { FormEvent, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import FileForm from "./file-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth.slice";
import { SelectInterface } from "@/types/interface";
import { User } from "firebase/auth";

export default function AddFile({
  pipelineId,
  contacts,
  deals,
  setDialogOpen,
}: AddProps) {
  const loggedUser: User | null = useSelector(selectCurrentUser);

  const [selectedContacts, setSelectedContacts] = useState<SelectInterface[]>(
    contacts ?? []
  );
  const [selectedDeals, setSelectedDeals] = useState<SelectInterface[]>(
    deals ?? []
  );
  const [selectedUploader, setSelectedUploader] = useState<SelectInterface>(
    loggedUser
      ? {
          label: loggedUser?.displayName + " (You)",
          value: loggedUser?.uid ?? "",
        }
      : ({} as SelectInterface)
  );

  const [uploadFile, { isLoading, isSuccess, isError, error }] =
    useAddFileMutation();

  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [validationError, setValidationError] = useState<{
    isError: boolean;
    error: string;
  }>({ isError: false, error: "" });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (!selectedFile)
      return setValidationError({
        isError: true,
        error: "Please select file to upload",
      });

    if (!selectedDeals.length)
      return setValidationError({
        isError: true,
        error: "Please select atleast one deal",
      });

    if (!selectedContacts.length)
      return setValidationError({
        isError: true,
        error: "Please select atleast one contact",
      });

    const dealIds: any = selectedDeals.map((i) => i.value);
    const contactIds: any = selectedContacts.map((i) => i.value);

    const newFormData = new FormData();

    newFormData.append("file", selectedFile as File);
    newFormData.append("dealId", dealIds);
    newFormData.append("contactId", contactIds);
    newFormData.append("uploader", loggedUser?.uid ?? "");

    await uploadFile(newFormData);
  };

  const handleCancel = () => {
    setSelectedContacts(contacts ?? []);
    setSelectedDeals(deals ?? []);
    setDialogOpen && setDialogOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      setSelectedFile(null);
      toast.success("File Added Successfully");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, error, isError]);

  return (
    <FileForm
      pipelineId={pipelineId}
      contacts={selectedContacts}
      setContacts={setSelectedContacts}
      deals={selectedDeals}
      setDeals={setSelectedDeals}
      states={{ isLoading }}
      handleCancel={handleCancel}
      uploader={selectedUploader}
      setUploader={setSelectedUploader}
      handleSubmit={handleSubmit}
      validationError={validationError}
      setSelectedFile={setSelectedFile}
    />
  );
}
