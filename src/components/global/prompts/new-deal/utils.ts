import { DealInterface } from "@/types/interface";
import * as yup from "yup";

export interface NewDealInterface
  extends Omit<
    DealInterface,
    | "id"
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
    | "pipelineId"
  > {
  creator: string;
  contacts: string[];
}

export const newDealInitialValues: NewDealInterface = {
  name: "",
  desc: "",
  labelId: "",
  contacts: [],
  currency: "INR",
  value: 0,
  currentStageId: "",
  expectedClosingDate: new Date(),
  // items: "",
  creator: "",
};

export const newDealSchema = yup.object().shape({
  name: yup.string().required("Title is required"),
  desc: yup.string(),
  labelId: yup.string().required("Label is required"),
  contacts: yup.array().of(yup.string()).required("Contacts are required"),
  currency: yup.string().required("Currency is required"),
  value: yup
    .number()
    .required("Value is required")
    .min(0, "Value cannot be negative"),
  currentStageId: yup.string().required("Current stage is required"),
  expectedClosingDate: yup.date().required("Expected closing date is required"),
  // items: yup.string(),
  creator: yup.string().required("Creator is required"),
});
