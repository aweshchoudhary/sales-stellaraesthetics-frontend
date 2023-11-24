"use client";
// Import required modules and components
import React, { Dispatch, SetStateAction } from "react";

import DealSelect from "@/components/global/select/DealSelect";
import ContactSelect from "@/components/global/select/ContactSelect";

import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { SelectInterface } from "@/types/interface";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Icon } from "@iconify/react";
import UserSelect from "../../select/UserSelect";
import { Alert, AlertTitle } from "@/components/ui/alert";

// Define the Props interface for FileForm
type Props = {
  pipelineId?: string;
  contacts: SelectInterface[];
  setContacts: Dispatch<SetStateAction<SelectInterface[]>>;
  deals: SelectInterface[];
  setDeals: Dispatch<SetStateAction<SelectInterface[]>>;
  states: any;
  handleCancel: any;
  handleSubmit: any;
  uploader: SelectInterface;
  setUploader: Dispatch<SetStateAction<SelectInterface>>;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
  validationError: {
    isError: boolean;
    error: string;
  };
};

// FileForm component
const FileForm: React.FC<Props> = ({
  pipelineId,
  contacts,
  deals,
  states,
  setContacts,
  setDeals,
  handleSubmit,
  handleCancel,
  uploader,
  setUploader,
  validationError,
  setSelectedFile,
}) => {
  return (
    <form onSubmit={handleSubmit}>
      <div className="p-10">
        {validationError.isError ? (
          <Alert className="mb-5" variant="destructive">
            <AlertTitle className="flex items-center gap-2">
              <Icon
                icon="fluent:error-circle-24-regular"
                className="text-2xl"
              />
              {validationError.error}
            </AlertTitle>
          </Alert>
        ) : null}

        <div className="mb-5">
          <Label className="mb-2 block" htmlFor="file">
            Select File
          </Label>
          <Input
            type="file"
            id="file"
            name="file"
            className="cursor-pointer"
            placeholder="Select file to upload"
            onChange={(e) =>
              setSelectedFile(e.target.files?.length ? e.target.files[0] : null)
            }
          />
          {states.isError ? (
            <div className="mt-2 text-red-600 text-sm flex items-center gap-1">
              <Icon icon="ic:round-error" className="text-lg" />
              {states.error}
            </div>
          ) : null}
        </div>
        <div className="mb-5">
          {/* DealSelect component to select deals */}
          <DealSelect
            pipelineId={pipelineId}
            selectedData={deals}
            setSelectedData={setDeals}
          />
        </div>
        <div className="mb-5">
          {/* ContactSelect component to select contacts */}
          <ContactSelect
            pipelineId={pipelineId}
            selectedData={contacts}
            setSelectedData={setContacts}
          />
        </div>
        <div className="mb-5">
          {/* UserSelect component to select uploader */}
          <UserSelect
            selectedData={uploader}
            setSelectedData={setUploader}
            label="Select Uploader"
          />
          {/* Display formik error message for 'uploader' field */}
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
          {states.isLoading ? "Uploading..." : "Upload"}
        </Button>
      </DialogFooter>
    </form>
  );
};

export default FileForm;
