import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetStagesQuery } from "@/redux/services/stageApi";
import { SelectInterface, StageInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function StageSelect({
  compare = [],
  selectedData,
  setSelectedData,
  pipelineId,
}: {
  pipelineId?: string;
  compare?: SelectInterface[] | [];
  selectedData?: any;
  setSelectedData: any;
}) {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<StageInterface[]>([]);
  const [getStages, { isLoading, isFetching, isError }] =
    useLazyGetStagesQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
  };

  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const res = await getStages({
        search: search,
        data: true,
        searchFilters: JSON.stringify([
          { id: "pipelineId", value: pipelineId },
        ]),
        sort: JSON.stringify([{ id: "position", desc: false }]),
      });
      const mainOptions: any = { label: "Open Stages", options: [] };
      const otherOptions: any = { label: "Other Stages", options: [] };

      if (!res.data?.data) return;
      res.data?.data.map((item: StageInterface) => {
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
  }, [search, compare, getStages, pipelineId]);

  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getStages({
        data: true,
        filters: JSON.stringify([{ id: "pipelineId", value: pipelineId }]),
        sort: JSON.stringify([{ id: "position", desc: false }]),
      });
      if (data?.data?.length !== 0) {
        const items = data.data.map((item: StageInterface) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setSearchedData(items);
      }
    };
    preFetchData();
  }, [getStages, pipelineId]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Stages</label>
      <Select
        id="pipelineId"
        name="pipelineId"
        classNamePrefix="select"
        placeholder="Select Stages"
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
