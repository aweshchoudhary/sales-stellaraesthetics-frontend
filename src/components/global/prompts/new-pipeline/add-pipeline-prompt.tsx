import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectCurrentUser } from "@/redux/features/auth.slice";
import { useCreatePipelineMutation } from "@/redux/services/pipeline.api";
import { useFormik } from "formik";
import React, { Dispatch, SetStateAction, useEffect } from "react";
import { toast } from "react-toastify";
import * as yup from "yup";

type Props = {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
};

interface NewPipelineInterface {
  name: string;
}

const initialValues: NewPipelineInterface = {
  name: "",
};

const validationSchema = yup.object().shape({
  name: yup.string().required("Pipeline Name is Required"),
});

export default function AddNewPipeline({ open, setOpen }: Props) {
  const [createNewPipeline, { isLoading, isSuccess, isError, error }] =
    useCreatePipelineMutation();
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values: NewPipelineInterface) => handleSubmit(values),
  });

  const loggedUser = useAppSelector(selectCurrentUser);

  const handleSubmit = async (values: NewPipelineInterface) => {
    await createNewPipeline({ ...values, owner: loggedUser?.uid ?? "" });
    handleCancel();
  };

  const handleCancel = () => {
    formik.resetForm();
    setOpen(false);
  };

  useEffect(() => {
    let isMounted = true;
    if (isMounted && isSuccess) {
      formik.resetForm();
      toast.success("New Pipeline Added Successfully");
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
    <Dialog open={open}>
      <DialogContent className="sm:max-w-[60%]">
        <DialogHeader>
          <DialogTitle>New Pipeline</DialogTitle>
        </DialogHeader>
        <div className="overflow-y-auto max-h-[500px]">
          <form onSubmit={formik.handleSubmit}>
            <div className="p-5">
              <FormInput name="name" title="Pipeline Name" formik={formik} />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={handleCancel}
                variant="outline"
                disabled={isLoading}
              >
                Cancel
              </Button>
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Adding..." : "Add Pipeline"}
              </Button>
            </DialogFooter>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
