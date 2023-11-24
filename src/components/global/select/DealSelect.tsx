import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetDealsQuery } from "@/redux/services/deal.api";
import { DealInterface, SelectInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Select from "react-select";

type Props = {
  pipelineId?: string;
  compare?: [{ label: string; value: string }] | [];
  selectedData?: any;
  setSelectedData: any;
  formik?: any;
};

export default function DealSelect({
  pipelineId,
  compare = [],
  selectedData,
  setSelectedData,
  formik,
}: Props) {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<DealInterface[]>([]);
  const [getDeals, { isLoading, isFetching, isError }] = useLazyGetDealsQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
    if (!formik) return;
    const data = selectedOptions.map((i: SelectInterface) => i.value);
    formik.setFieldValue("deals", data);
  };

  // Fetch deals based on search input and pipelineId when it changes
  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const params: any = {
        search: search,
        data: true,
      };
      if (pipelineId)
        params.searchFilters = JSON.stringify([
          { id: "pipelineId", value: pipelineId },
        ]);

      // Fetch deals from the API
      const { data } = await getDeals(params);

      // Separate deals into main and other options based on comparison criteria
      const mainOptions: any = { label: "Open Deals", options: [] };
      const otherOptions: any = { label: "Other Deals", options: [] };

      if (!data?.data) return;
      data?.data.forEach((item: DealInterface) => {
        const option = {
          label: item.title,
          value: item.id,
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

      // Set the searchedData state with main and other options
      setSearchedData(
        compare.length ? [mainOptions, otherOptions] : [otherOptions]
      );
    };

    // Trigger the search function after a delay when the search input changes
    const interval = setTimeout(() => {
      if (search.length > 2) {
        searchDataFn(search);
      }
    }, 500);

    // Clean up the timer to avoid unnecessary calls
    return () => {
      clearTimeout(interval);
    };
  }, [search, compare, getDeals, pipelineId]);

  // Pre-fetch data on component mount to show initial options
  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getDeals({
        filters: JSON.stringify([{ id: "pipelineId", value: pipelineId }]),
        data: true,
      });
      if (data?.data?.length !== 0) {
        const items = data.data.map((item: any) => {
          return {
            label: item.title,
            value: item.id,
          };
        });
        setSearchedData(items);
      }
    };
    preFetchData();
  }, [getDeals, pipelineId]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Deals</label>
      {/* Select component to display the options */}
      <Select
        isMulti
        id="deals"
        name="deals"
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Deals"
        isLoading={isLoading || isFetching}
        onInputChange={(e) => setSearch(e)}
        options={searchedData}
        value={selectedData}
        onChange={handleChange}
        onBlur={formik && formik.handleBlur}
      />
      {/* Show an error alert if an error occurs during fetching */}
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
