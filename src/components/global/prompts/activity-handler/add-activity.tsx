import { useFormik } from "formik";
import {
  AddProps,
  CreateActivityInterface,
  activityInitialValues,
  activityValidationSchema,
} from "./form-utils";
import { useCreateActivityMutation } from "@/redux/services/activity.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityForm from "./activity-form";
import { useSelector } from "react-redux";
import { selectCurrentUser } from "@/redux/features/auth.slice";
import { SelectInterface } from "@/types/interface";
import { User } from "firebase/auth";

export default function AddActivity({
  pipelineId,
  contacts,
  deals,
  dateSelectRange,
  setDialogOpen,
}: AddProps) {
  const loggedUser: User | null = useSelector(selectCurrentUser);

  const formik = useFormik({
    initialValues: activityInitialValues,
    validationSchema: activityValidationSchema,
    onSubmit: (values: CreateActivityInterface) => handleSubmit(values),
  });

  const [selectedContacts, setSelectedContacts] = useState<SelectInterface[]>(
    contacts ?? []
  );
  const [selectedDeals, setSelectedDeals] = useState<SelectInterface[]>(
    deals ?? []
  );
  const [selectedPerformer, setSelectedPerformer] = useState<SelectInterface>(
    loggedUser
      ? {
          label: loggedUser?.displayName ?? "",
          value: loggedUser?.uid ?? "",
        }
      : ({} as SelectInterface)
  );

  const [createActivity, { isLoading, isSuccess, isError, error }] =
    useCreateActivityMutation();

  const handleSubmit = async (values: CreateActivityInterface) => {
    if (loggedUser?.uid) {
      await createActivity({ ...values, creator: loggedUser.uid });
    }
  };
  const handleCancel = () => {
    formik.resetForm();
    setSelectedContacts(contacts ?? []);
    setSelectedDeals(deals ?? []);
    setDialogOpen && setDialogOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      formik.resetForm;
      toast.success("Activity Added Successfully");
    }
    if (isError) {
      toast.error("Something went wrong. Please try again");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, formik.resetForm, error, isError]);

  return (
    <ActivityForm
      formik={formik}
      pipelineId={pipelineId}
      contacts={selectedContacts}
      setContacts={setSelectedContacts}
      deals={selectedDeals}
      setDeals={setSelectedDeals}
      states={{ isLoading }}
      handleCancel={handleCancel}
      performer={selectedPerformer}
      setPerformer={setSelectedPerformer}
      dateSelectRange={dateSelectRange}
    />
  );
}
