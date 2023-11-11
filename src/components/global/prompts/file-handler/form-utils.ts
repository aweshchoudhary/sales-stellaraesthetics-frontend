import { FileInterface, SelectInterface } from "@/types/interface";

export type AddProps = {
  pipelineId?: string;
  compare?: SelectInterface[];
  deals?: SelectInterface[];
  contacts?: SelectInterface[];
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type EditProps = {
  FileId?: any;
  isUpdate?: boolean;
  setDialogOpen?: React.Dispatch<React.SetStateAction<boolean>>;
};

export type CreateFileInterface = Pick<
  FileInterface,
  "file" | "contactId" | "dealId"
>;
