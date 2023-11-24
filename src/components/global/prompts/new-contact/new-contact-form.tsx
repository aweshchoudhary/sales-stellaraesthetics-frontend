import React, { Dispatch, SetStateAction } from "react";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import { FormikProps } from "formik";
import { DialogFooter } from "@/components/ui/dialog";
import { NewContactInterface } from "./utils";

type Props = {
  formik: FormikProps<NewContactInterface>;
  states: any;
  handleCancel: any;
};

export default function NewContactForm({
  formik,
  states,
  handleCancel,
}: Props) {
  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="p-5">
        <FormInput name="company" title="Company Name" formik={formik} />
        <FormInput
          name="contactPerson"
          title="Contact Person"
          formik={formik}
        />
        <FormInput name="email" title="Email" formik={formik} />
        <FormInput name="mobile" title="Mobile Number" formik={formik} />
        <FormInput name="whatsapp" title="Whatsapp Number" formik={formik} />
      </div>
      <DialogFooter>
        <Button
          type="button"
          onClick={handleCancel}
          variant="outline"
          disabled={states.isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={states.isLoading}>
          {states.isLoading ? "Adding..." : "Add Contact"}
        </Button>
      </DialogFooter>
    </form>
  );
}
