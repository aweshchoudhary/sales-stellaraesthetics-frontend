import { NoteInterface, SelectInterface } from "@/types/interface";
import * as yup from "yup";

export type AddProps = {
  pipelineId: string;
  compare?: SelectInterface[];
  deals: SelectInterface[];
  contacts: SelectInterface[];
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditProps = {
  noteId?: any;
  isUpdate?: boolean;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export interface CreateNoteInterface
  extends Omit<
    NoteInterface,
    "_id" | "createdAt" | "updatedAt" | "contacts" | "deals" | "creator"
  > {
  contacts: string[];
  deals: string[];
  creator: string;
}

export const noteValidationSchema = yup.object().shape({
  noteBody: yup.string().required("Note is required!"),
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
});

export const noteInitialValues: CreateNoteInterface = {
  noteBody: "",
  deals: [],
  contacts: [],
  pipelineId: "",
  creator: "",
};
