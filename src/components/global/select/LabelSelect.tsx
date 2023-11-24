import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetLabelsQuery } from "@/redux/services/labelApi";
import { LabelInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import chroma from "chroma-js";
import Select, { StylesConfig } from "react-select";

export default function LabelSelect({
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
  const [searchedData, setSearchedData] = useState<LabelInterface[]>([]);
  const [getLabels, { isLoading, isFetching, isError, error }] =
    useLazyGetLabelsQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
  };

  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const { data } = await getLabels({
        search: search,
        data: true,
      });
      const mainOptions: any = { label: "Open Labels", options: [] };
      const otherOptions: any = { label: "Other Labels", options: [] };

      if (!data?.length) return;
      data.map((item: LabelInterface) => {
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
  }, [search, compare, getLabels]);

  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getLabels({
        data: true,
      });
      if (data?.length !== 0) {
        const items = data.map((item: LabelInterface) => {
          return {
            label: item.name,
            value: item._id,
          };
        });
        setSearchedData(items);
      }
    };
    preFetchData();
  }, [getLabels]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Labels</label>
      <Select
        id="pipeline"
        name="pipeline"
        classNamePrefix="select"
        placeholder="Select Labels"
        isLoading={isLoading || isFetching}
        onInputChange={(e) => setSearch(e)}
        options={searchedData}
        value={selectedData}
        onChange={handleChange}
        // styles={colourStyles}
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

const dot = (color = "transparent") => ({
  alignItems: "center",
  display: "flex",

  ":before": {
    backgroundColor: color,
    borderRadius: 10,
    content: '" "',
    display: "block",
    marginRight: 8,
    height: 20,
    width: 20,
  },
});

// const colourStyles: StylesConfig<LabelInterface> = {
//   control: (styles) => ({ ...styles, backgroundColor: "white" }),
//   option: (styles, { data, isDisabled, isFocused, isSelected }) => {
//     const color = chroma(data.color);
//     return {
//       ...styles,
//       backgroundColor: isDisabled
//         ? undefined
//         : isSelected
//         ? data.color
//         : isFocused
//         ? color.alpha(0.1).css()
//         : undefined,
//       color: isDisabled
//         ? "#ccc"
//         : isSelected
//         ? chroma.contrast(color, "white") > 2
//           ? "white"
//           : "black"
//         : data.color,
//       cursor: isDisabled ? "not-allowed" : "default",

//       ":active": {
//         ...styles[":active"],
//         backgroundColor: !isDisabled
//           ? isSelected
//             ? data.color
//             : color.alpha(0.3).css()
//           : undefined,
//       },
//     };
//   },
//   input: (styles) => ({ ...styles, ...dot() }),
//   placeholder: (styles) => ({ ...styles, ...dot("#ccc") }),
//   singleValue: (styles, { data }) => ({ ...styles, ...dot(data.color) }),
// };
