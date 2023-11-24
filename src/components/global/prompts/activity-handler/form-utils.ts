import {
  ActivityInterface,
  NoteInterface,
  SelectInterface,
} from "@/types/interface";
import * as yup from "yup";

export type AddProps = {
  pipelineId?: string;
  compare?: SelectInterface[];
  deals?: SelectInterface[];
  contacts?: SelectInterface[];
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  dateSelectRange?: {
    startDateTime: Date;
    endDateTime: Date;
  };
};

export type EditProps = {
  activityId?: any;
  isUpdate?: boolean;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CreateActivityInterface
  extends Omit<
    ActivityInterface,
    | "_id"
    | "createdAt"
    | "updatedAt"
    | "performer"
    | "creator"
    | "deals"
    | "contacts"
    | "involved_contacts"
    | "involved_users"
    | "googleEventId"
    | "googleEventHtmlLink"
  > {
  performer: string;
  creator: string;
  deals: string[];
  contacts: string[];
}

export const activityValidationSchema = yup.object().shape({
  title: yup.string().required("Title is required!"),
  description: yup.string(),
  type: yup.string().required("Type is required!"),
  startDateTime: yup.date().required("Start Date & Time is required!"),
  endDateTime: yup.date().required("End Date & Time is required!"),
  location: yup.string(),
  taskUrl: yup.string().url(),
  performer: yup.string().required("Performer is required!"),
  deals: yup
    .array()
    .of(yup.string().required("Deal title is required!")) // Validate deal title, not just "Title is required!"
    .min(1, "Select at least one Deal!") // Require at least one deal to be selected
    .nullable(),
  contacts: yup
    .array()
    .of(yup.string().required("Select at least one Contact!")) // Validate contact selection
    .min(1, "Select at least one Contact!") // Require at least one contact to be selected
    .nullable(),
  icon: yup.string().required("Icon is required!"),
  completed_on: yup.date().nullable(),
});

export const activityInitialValues: CreateActivityInterface = {
  title: "",
  description: "",
  type: "call",
  icon: "solar:phone-calling-outline",
  startDateTime: new Date(),
  endDateTime: new Date(),
  location: "",
  taskUrl: "",
  performer: "",
  creator: "",
  deals: [],
  contacts: [],
  completed_on: null,
};
