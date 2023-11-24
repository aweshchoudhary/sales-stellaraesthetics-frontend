import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import FormInput from "@/components/form/FormInput";
import { Button } from "@/components/ui/button";
import PipelineSelect from "@/components/global/select/PipelineSelect";
import FormError from "@/components/form/FormError";
import LabelSelect from "@/components/global/select/LabelSelect";
import StageSelect from "@/components/global/select/StageSelect";
import { useGetStagesQuery } from "@/redux/services/stage.api";
import { FormikProps } from "formik";
import { PipelineInterface, SelectInterface } from "@/types/interface";
import { DialogFooter } from "@/components/ui/dialog";
import { NewDealInterface } from "./utils";
import DatePicker from "@/components/form/DatePicker";
import { Label } from "@/components/ui/label";
import CurrencySelect from "@/components/global/select/CurrencySelect";
import { useAppSelector } from "@/hooks/redux-hooks";
import { selectCurrentUser } from "@/redux/features/auth.slice";

type Props = {
  formik: FormikProps<NewDealInterface>;
  setOpen: Dispatch<SetStateAction<boolean>>;
  states: any;
  pipeline: PipelineInterface;
  selectedCurrentStage?: SelectInterface;
  handleCancel: any;
};

export default function NewDealForm({
  formik,
  setOpen,
  states,
  pipeline,
  selectedCurrentStage,
  handleCancel,
}: Props) {
  const [expectedClosingDate, setExpectedClosingDate] = useState<
    Date | undefined
  >(new Date());

  const { data: stages, ...stagesStates } = useGetStagesQuery({
    data: true,
    filters: JSON.stringify([{ id: "pipelineId", value: pipeline.id }]),
    sort: JSON.stringify([{ id: "position", desc: false }]),
  });

  const loggedUser = useAppSelector(selectCurrentUser);

  const [selectedPipeline, setSelectedPipeline] = useState<SelectInterface>({
    label: pipeline.name,
    value: pipeline.id,
  } as SelectInterface);

  const [selectedStage, setSelectedStage] = useState<SelectInterface>(
    selectedCurrentStage ??
      ({
        label: stages?.data && stages.data[0].name,
        value: stages?.data && stages.data[0].id,
      } as SelectInterface)
  );

  const [selectedCurrency, setSelectedCurrency] =
    useState<SelectInterface | null>({
      label: "Indian Rupee (Rs)",
      value: "INR",
    });

  const [selectedLabel, setSelectedLabel] = useState<SelectInterface | null>(
    null
  );

  useEffect(() => {
    formik.setFieldValue("pipelineId", selectedPipeline.value);
  }, [selectedPipeline, formik.setFieldValue]);

  useEffect(() => {
    selectedLabel && formik.setFieldValue("label", selectedLabel.value);
  }, [selectedLabel, formik.setFieldValue]);

  useEffect(() => {
    selectedStage && formik.setFieldValue("currentStage", selectedStage.value);
  }, [selectedStage, formik.setFieldValue]);

  useEffect(() => {
    selectedCurrency &&
      formik.setFieldValue("currency", selectedCurrency.value);
  }, [selectedCurrency, formik.setFieldValue]);

  useEffect(() => {
    formik.setFieldValue("expectedClosingDate", expectedClosingDate);
  }, [expectedClosingDate, formik.setFieldValue]);

  useEffect(() => {
    formik.setFieldValue("creator", loggedUser?.uid ?? "");
  }, [loggedUser]);

  return (
    <form onSubmit={formik.handleSubmit} className="w-full">
      <div className="p-5">
        <FormInput name="title" title="Deal Title" formik={formik} />
        <div className="flex gap-5">
          <FormInput
            type="number"
            name="value"
            title="Value"
            className="flex-1"
            formik={formik}
          />
          <div className="flex-1">
            <CurrencySelect
              setSelectedData={setSelectedCurrency}
              selectedData={selectedCurrency}
            />
          </div>
        </div>
        <div className="mb-5">
          <PipelineSelect
            selectedData={selectedPipeline}
            setSelectedData={setSelectedPipeline}
            compare={[{ label: pipeline.name, value: pipeline.id }]}
          />
          <FormError formik={formik} name="pipelineId" />
        </div>
        <div className="mb-5">
          <LabelSelect
            selectedData={selectedLabel}
            setSelectedData={setSelectedLabel}
          />
          <FormError formik={formik} name="label" />
        </div>
        <div className="mb-5">
          <StageSelect
            selectedData={selectedStage}
            setSelectedData={setSelectedStage}
            pipelineId={pipeline.id}
          />
          <FormError formik={formik} name="currentStage" />
        </div>
        <div className="mb-5">
          <Label className="mb-2 block">Expected Closing Date</Label>
          <DatePicker
            setDate={setExpectedClosingDate}
            date={expectedClosingDate}
          />
          <FormError formik={formik} name="expectedClosingDate" />
        </div>
      </div>
      <DialogFooter>
        <Button
          type="button"
          onClick={handleCancel}
          variant="outline"
          disabled={states.isLoading}
        >
          Cancel
        </Button>
        <Button type="submit" disabled={states.isLoading}>
          {states.isLoading ? "Adding..." : "Add Deal"}
        </Button>
      </DialogFooter>
    </form>
  );
}
