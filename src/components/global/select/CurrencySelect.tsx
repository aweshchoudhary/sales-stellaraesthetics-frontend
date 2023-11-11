import { SelectInterface } from "@/types/interface";
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useMemo,
  useState,
} from "react";
import Select from "react-select";
import currencyData from "@/data/currency-list.json";

export default function CurrencySelect({
  selectedData,
  setSelectedData,
  formik,
}: {
  selectedData: SelectInterface | null;
  setSelectedData: Dispatch<SetStateAction<SelectInterface | null>>;
  formik?: any;
}) {
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
    if (!formik) return;
    const data = selectedOptions.map((i: SelectInterface) => i.value);
    formik.setFieldValue("currency", data);
  };

  const currencyList = useMemo(() => {
    setIsLoading(true);
    const list = Object.entries(currencyData).map(
      ([currencyId, currency], i) => {
        return {
          label: `${currency.name} (${currency.symbol})`,
          value: currencyId,
        };
      }
    );
    setIsLoading(false);
    return list;
  }, []);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Currency</label>
      <Select
        id="pipelineId"
        name="pipelineId"
        classNamePrefix="select"
        placeholder="Select Currency"
        isLoading={isLoading}
        onInputChange={(e) => setSearch(e)}
        options={currencyList}
        value={selectedData}
        onChange={handleChange}
      />
    </div>
  );
}
