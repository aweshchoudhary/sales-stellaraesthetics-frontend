import { DealInterface } from "@/types/interface";
import * as yup from "yup";

export interface NewDealInterface
  extends Omit<
    DealInterface,
    | "_id"
    | "updatedAt"
    | "createdAt"
    | "contacts"
    | "creator"
    | "files"
    | "activities"
    | "notes"
    | "mails"
    | "label"
    | "status"
    | "items"
  > {
  creator: string;
  label: string;
  contacts: string[];
}

export const newDealInitialValues: NewDealInterface = {
  title: "",
  desc: "",
  label: "",
  contacts: [],
  currency: "INR",
  value: 0,
  currentStage: "",
  expectedClosingDate: new Date(),
  // items: "",
  pipelineId: "",
  creator: "",
};

export const newDealSchema = yup.object().shape({
  title: yup.string().required("Title is required"),
  desc: yup.string(),
  label: yup.string().required("Label is required"),
  contacts: yup.array().of(yup.string()).required("Contacts are required"),
  currency: yup.string().required("Currency is required"),
  value: yup
    .number()
    .required("Value is required")
    .min(0, "Value cannot be negative"),
  currentStage: yup.string().required("Current stage is required"),
  expectedClosingDate: yup.date().required("Expected closing date is required"),
  // items: yup.string(),
  pipelineId: yup.string().required("Pipeline ID is required"),
  creator: yup.string().required("Creator is required"),
});
