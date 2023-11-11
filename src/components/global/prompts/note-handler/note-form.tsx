// Import required modules and components
import React, { Dispatch, SetStateAction, useEffect } from "react";

import FormError from "@/components/form/FormError";
import FormInput from "@/components/form/FormInput";

import DealSelect from "@/components/global/select/DealSelect";
import ContactSelect from "@/components/global/select/ContactSelect";

import { FormikProps } from "formik";
import { CreateNoteInterface } from "./form-utils";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { SelectInterface } from "@/types/interface";

// Define the Props interface for NoteForm
type Props = {
  formik: FormikProps<CreateNoteInterface>;
  pipelineId: string;
  contacts: SelectInterface[];
  setContacts: Dispatch<SetStateAction<SelectInterface[]>>;
  deals: SelectInterface[];
  setDeals: Dispatch<SetStateAction<SelectInterface[]>>;
  states: any;
  handleCancel: any;
};

// NoteForm component
const NoteForm: React.FC<Props> = ({
  formik,
  pipelineId,
  contacts,
  deals,
  states,
  setContacts,
  setDeals,
  handleCancel,
}) => {
  // Extracted reusable function to set formik field values
  const setFormikFieldValues = (
    fieldName: string,
    items: SelectInterface[]
  ): void => {
    if (items.length) {
      const itemValues = items.map((item) => item.value);
      formik.setFieldValue(fieldName, itemValues);
    }
  };

  // Effect to set 'deals' field in formik whenever 'deals' prop changes
  useEffect(() => {
    setFormikFieldValues("deals", deals);
  }, [deals]);

  // Effect to set 'contacts' field in formik whenever 'contacts' prop changes
  useEffect(() => {
    setFormikFieldValues("contacts", contacts);
  }, [contacts]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-10">
        <FormInput
          formik={formik}
          textarea
          name="noteBody"
          title="Note Description"
        />
        <div className="mb-5">
          {/* DealSelect component to select deals */}
          <DealSelect
            pipelineId={pipelineId}
            selectedData={deals}
            setSelectedData={setDeals}
            formik={formik}
          />
          {/* Display formik error message for 'deals' field */}
          <FormError formik={formik} name="deals" />
        </div>
        <div className="mb-5">
          {/* ContactSelect component to select contacts */}
          <ContactSelect
            pipelineId={pipelineId}
            selectedData={contacts}
            setSelectedData={setContacts}
          />
          {/* Display formik error message for 'contacts' field */}
          <FormError formik={formik} name="contacts" />
        </div>
      </div>

      {/* Footer with cancel and submit buttons */}
      <DialogFooter>
        <Button
          type="button"
          onClick={handleCancel}
          disabled={states.isLoading}
          variant="outline"
        >
          Cancel
        </Button>
        <Button type="submit" disabled={states.isLoading}>
          {states.isLoading ? "Submitting..." : "Submit"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default NoteForm;
