import { Icon } from "@iconify/react";
import React from "react";

type Props = {
  formik: any;
  name: string;
  customMsg?: string;
};

const FormError = ({ formik, name, customMsg }: Props) => {
  return formik.touched[name] && formik.errors[name] ? (
    <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
      <Icon icon="ic:round-error" className="text-lg" />
      {customMsg || formik.errors[name]}
    </div>
  ) : null;
};

export default FormError;
