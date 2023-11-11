import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetPipelinesQuery } from "@/redux/services/pipelineApi";
import { PipelineInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function PipelineSelect({
  compare = [],
  selectedData,
  setSelectedData,
}: {
  pipelineId?: string;
  compare?: [{ label: string; value: string }] | [];
  selectedData?: any;
  setSelectedData: any;
}) {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<PipelineInterface[]>([]);
  const [getPipelines, { isLoading, isFetching, isError }] =
    useLazyGetPipelinesQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
  };

  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const res = await getPipelines({
        search: search,
        data: true,
      });
      const mainOptions: any = { label: "Open Pipelines", options: [] };
      const otherOptions: any = { label: "Other Pipelines", options: [] };

      if (!res.data?.data) return;
      res.data?.data.map((item: PipelineInterface) => {
        const option = {
          label: item.name,
          value: item._id,
        };
        if (!compare.length) {
          otherOptions.options.push(option);
          return;
        }
        compare.forEach((comp) => {
          if (option.value === comp.value) {
            mainOptions.options.push(option);
          } else {
            otherOptions.options.push(option);
          }
        });
      });
      setSearchedData(
        compare.length ? [mainOptions, otherOptions] : [otherOptions]
      );
    };
    const interval = setTimeout(
      () => search.length > 2 && searchDataFn(search),
      500
    );
    return () => {
      clearTimeout(interval);
    };
  }, [search, compare, getPipelines]);

  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getPipelines({
        data: true,
      });
      if (data?.data?.length !== 0) {
        const items = data.data.map((item: PipelineInterface) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setSearchedData(items);
      }
    };
    preFetchData();
  }, [getPipelines]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Pipelines</label>
      <Select
        id="pipelineId"
        name="pipelineId"
        classNamePrefix="select"
        placeholder="Select Pipelines"
        isLoading={isLoading || isFetching}
        onInputChange={(e) => setSearch(e)}
        options={searchedData}
        value={selectedData}
        onChange={handleChange}
      />
      {isError ? (
        <Alert>
          <AlertDescription className="text-red-600">
            Something went wrong. Try again
          </AlertDescription>
        </Alert>
      ) : null}
    </div>
  );
}
