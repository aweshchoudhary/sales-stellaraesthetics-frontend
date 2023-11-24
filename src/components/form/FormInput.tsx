import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormError from "./FormError";
import { cn } from "@/lib/utils";

interface FormInputProps {
  formik: any;
  title: string;
  name: string;
  className?: string;
  inputClassName?: string;
  type?: string;
  textarea?: boolean;
  autoFocus?: boolean;
}

const FormInput: React.FC<FormInputProps> = ({
  title,
  formik,
  name,
  className,
  inputClassName,
  type,
  textarea,
  autoFocus,
}) => {
  return (
    <div className={cn("mb-5", className)}>
      <Label htmlFor={name} className="block mb-2">
        {title}
      </Label>
      {textarea ? (
        <Textarea
          id={name}
          name={name}
          placeholder={title}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          // {...props}
        />
      ) : (
        <Input
          type={type || "text"}
          id={name}
          name={name}
          placeholder={title}
          className={inputClassName}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values[name]}
          autoFocus={autoFocus}
        />
      )}
      <FormError name={name} formik={formik} />
    </div>
  );
};

export default FormInput;
