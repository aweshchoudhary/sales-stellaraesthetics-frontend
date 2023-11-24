import { useFormik } from "formik";
import {
  CreateActivityInterface,
  EditProps,
  activityInitialValues,
  activityValidationSchema,
} from "./form-utils";
import {
  useLazyGetActivityQuery,
  useUpdateActivityMutation,
} from "@/redux/services/activity.api";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import ActivityForm from "./activity-form";
import {
  ActivityInterface,
  ContactInterface,
  DealInterface,
  SelectInterface,
} from "@/types/interface";
import ModalLoader from "@/components/global/loaders/ModalLoader";
import { User } from "firebase/auth";

export default function EditActivity({ activityId, setDialogOpen }: EditProps) {
  const [contacts, setContacts] = useState<SelectInterface[]>([]);
  const [deals, setDeals] = useState<SelectInterface[]>([]);
  const [performer, setPerformer] = useState<SelectInterface>(
    {} as SelectInterface
  );

  const [getActivity, states] = useLazyGetActivityQuery();
  const [updateActivity, { isLoading, isSuccess, isError, error }] =
    useUpdateActivityMutation();

  const formik = useFormik({
    initialValues: activityInitialValues,
    validationSchema: activityValidationSchema,
    onSubmit: (values: CreateActivityInterface) => handleSubmit(values),
  });

  const handleSubmit = async (values: CreateActivityInterface) => {
    await updateActivity({ update: values, id: activityId });
  };

  const handleCancel = () => {
    formik.resetForm();
    setDialogOpen && setDialogOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      formik.resetForm;
      toast.success("Activity Updated Successfully");
      handleCancel();
    }
    if (isError) {
      toast.error("Something went wrong. Try again");
      console.log(error);
    }
    return () => {
      isMounted = false;
    };
  }, [isSuccess, formik.resetForm, error, isError]);

  useEffect(() => {
    const handleGetActivity = async (id: string) => {
      const res = await getActivity({
        id,
        filters: { populate: "deals contacts performer" },
      });
      const {
        id: ID,
        updatedAt,
        createdAt,
        creator,
        ...activity
      }: ActivityInterface = res.data;
      const deals = activity.deals.map((deal: DealInterface) => ({
        label: deal.title,
        value: deal.id,
      }));
      const contacts = activity.contacts.map((contact: ContactInterface) => ({
        label: contact.contactPerson,
        value: contact.id,
      }));
      const performer: string = activity.performer;
      setContacts(contacts);
      setDeals(deals);
      // setPerformer({ label: performer.displ, value: performer.id });
      formik.setValues(activity);
    };

    if (activityId) handleGetActivity(activityId);
  }, [activityId, getActivity]);

  if (states.isLoading || states.isFetching) return <ModalLoader />;
  if (states.isSuccess) {
    const { data }: any = states;
    return (
      <ActivityForm
        formik={formik}
        pipelineId={data?.pipelineId}
        contacts={contacts}
        setContacts={setContacts}
        deals={deals}
        setDeals={setDeals}
        states={{ isLoading }}
        handleCancel={handleCancel}
        performer={performer}
        setPerformer={setPerformer}
      />
    );
  }
}
