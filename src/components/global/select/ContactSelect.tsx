import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetContactsQuery } from "@/redux/services/contact.api";
import { ContactInterface, SelectInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function ContactSelect({
  compare = [],
  selectedData,
  setSelectedData,
  formik,
}: {
  pipelineId?: string;
  compare?: [{ label: string; value: string }] | [];
  selectedData?: any;
  setSelectedData: any;
  formik?: any;
}) {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<SelectInterface[]>([]);
  const [getContacts, { isLoading, isFetching, isError }] =
    useLazyGetContactsQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
    if (!formik) return;
    const data = selectedOptions.map((i: SelectInterface) => i.value);
    formik.setFieldValue("contact", data);
  };

  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const res = await getContacts({ search: search, data: true });
      const mainOptions: any = { label: "Open Contacts", options: [] };
      const otherOptions: any = { label: "Other Contacts", options: [] };

      if (!res.data) return;

      res.data.map((item: ContactInterface) => {
        const option = {
          label: item.contactPerson,
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
  }, [search, compare, getContacts]);

  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getContacts({ data: true });
      if (data?.length !== 0) {
        const items = data?.map((item: ContactInterface) => {
          return {
            label: item.contactPerson,
            value: item.id,
          };
        });
        setSearchedData(items ?? []);
      }
    };
    preFetchData();
  }, [getContacts]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">Contacts</label>
      <Select
        isMulti
        id="contacts"
        name="contacts"
        className="basic-multi-select"
        classNamePrefix="select"
        placeholder="Select Contacts"
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
