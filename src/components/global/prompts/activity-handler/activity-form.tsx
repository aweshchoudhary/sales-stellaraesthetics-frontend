// Import required modules and components
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";

import FormError from "@/components/form/FormError";
import FormInput from "@/components/form/FormInput";
import DatePicker from "@/components/form/DatePicker";

import DealSelect from "@/components/global/select/DealSelect";
import ContactSelect from "@/components/global/select/ContactSelect";
import UserSelect from "@/components/global/select/UserSelect";

import { Icon } from "@iconify/react";
import { FormikProps } from "formik";
import { CreateActivityInterface } from "./form-utils";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { SelectInterface } from "@/types/interface";

// Define the Props interface for ActivityForm
type Props = {
  formik: FormikProps<CreateActivityInterface>;
  pipelineId?: string;
  contacts: SelectInterface[];
  setContacts: Dispatch<SetStateAction<SelectInterface[]>>;
  deals: SelectInterface[];
  setDeals: Dispatch<SetStateAction<SelectInterface[]>>;
  states: any;
  handleCancel: any;
  performer: SelectInterface;
  setPerformer: Dispatch<SetStateAction<SelectInterface>>;
  dateSelectRange?: {
    startDateTime: Date;
    endDateTime: Date;
  };
};

// ActivityForm component
const ActivityForm: React.FC<Props> = ({
  formik,
  pipelineId,
  contacts,
  deals,
  states,
  setContacts,
  setDeals,
  performer,
  setPerformer,
  handleCancel,
  dateSelectRange,
}) => {
  // State hooks to manage date and time inputs
  const [startDateTime, setStartDateTime] = useState<Date | undefined>(
    dateSelectRange?.startDateTime ?? new Date()
  );
  const [endDateTime, setEndDateTime] = useState<Date | undefined>(
    dateSelectRange?.endDateTime ?? new Date()
  );
  const [type, setType] = useState<string>("call");

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

  // Effect to update formik values when 'performer', 'startDateTime', or 'endDateTime' changes
  useEffect(() => {
    if (performer) formik.setFieldValue("performer", performer.value);
    if (startDateTime) formik.setFieldValue("startDateTime", startDateTime);
    if (endDateTime) formik.setFieldValue("endDateTime", endDateTime);
  }, [performer, startDateTime, endDateTime]);

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="p-10">
        {/* Form input for Activity Title */}
        <FormInput formik={formik} name="title" title="Activity Title" />

        <div className="mb-5">
          <div className="flex gap-2">
            {/* Buttons to select Activity Type */}
            <ActivityTypeButton
              type="call"
              icon="solar:phone-calling-outline"
              selectedType={type}
              setType={setType}
              formik={formik}
            />
            <ActivityTypeButton
              type="email"
              icon="basil:envelope-outline"
              selectedType={type}
              setType={setType}
              formik={formik}
            />
            <ActivityTypeButton
              type="meeting"
              icon="solar:users-group-rounded-outline"
              selectedType={type}
              setType={setType}
              formik={formik}
            />
            <ActivityTypeButton
              type="task"
              icon="solar:clock-circle-outline"
              selectedType={type}
              setType={setType}
              formik={formik}
            />
          </div>
          {/* Display formik error message for 'type' field */}
          <FormError formik={formik} name="type" />
        </div>

        {/* Date and Time inputs */}
        <div className="flex mb-5 gap-5">
          <div className="flex-1">
            <label className="block mb-1 text-sm">Start Date & Time</label>
            <DatePicker date={startDateTime} setDate={setStartDateTime} />
            {/* Display formik error message for 'startDateTime' field */}
            <FormError formik={formik} name="startDateTime" />
          </div>
          <div className="flex-1">
            <label className="block mb-1 text-sm">End Date & Time</label>
            <DatePicker date={endDateTime} setDate={setEndDateTime} />
            {/* Display formik error message for 'endDateTime' field */}
            <FormError formik={formik} name="endDateTime" />
          </div>
        </div>

        {/* Form inputs for Location and Description */}
        <FormInput formik={formik} name="location" title="Location" />
        <FormInput
          formik={formik}
          textarea
          name="description"
          title="Description"
        />

        <div className="mb-5">
          {/* DealSelect component to select deals */}
          <DealSelect
            pipelineId={pipelineId}
            selectedData={deals}
            setSelectedData={setDeals}
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
        <div className="mb-5">
          {/* UserSelect component to select performer */}
          <UserSelect
            selectedData={performer}
            setSelectedData={setPerformer}
            label="Select Performer"
          />
          {/* Display formik error message for 'performer' field */}
          <FormError formik={formik} name="performer" />
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

// Props interface for ActivityTypeButton component
type ActivityTypeButtonProps = {
  type: string;
  icon: string;
  selectedType: string;
  setType: (type: string) => void;
  formik: FormikProps<CreateActivityInterface>;
};

// ActivityTypeButton component to select activity type
const ActivityTypeButton: React.FC<ActivityTypeButtonProps> = ({
  type,
  icon,
  selectedType,
  setType,
  formik,
}) => {
  return (
    <Button
      variant="outline"
      type="button"
      className={selectedType === type ? "bg-accent" : ""}
      onClick={() => {
        setType(type);
        // Set the selected activity type and icon in formik
        formik.values.type = type;
        formik.values.icon = icon;
      }}
    >
      <Icon className="text-lg" icon={icon} />
    </Button>
  );
};

export default ActivityForm;
