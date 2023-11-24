import { ContactInterface } from "@/types/interface";
import * as yup from "yup";

export type NewContactInterface = Omit<
  ContactInterface,
  "id" | "updatedAt" | "createdAt"
>;

export const newContactInitialValues: NewContactInterface = {
  company: "",
  contactPerson: "",
  email: "",
  mobile: "",
  whatsapp: "",
};

export const newContactSchema = yup.object().shape({
  company: yup.string().required("Company name is required"),
  contactPerson: yup.string().required("Contact Person is required"),
  email: yup.string().required("Email is required"),
  mobile: yup.string().required("Mobile Number is required"),
  whatsapp: yup.string().required("Whatsapp Number is required"),
});
