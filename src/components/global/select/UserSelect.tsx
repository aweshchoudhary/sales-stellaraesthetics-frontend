import { Alert, AlertDescription } from "@/components/ui/alert";
import { useLazyGetUsersQuery } from "@/redux/services/userApi";
import { UserInterface, DealInterface } from "@/types/interface";
import React, { useEffect, useState } from "react";
import Select from "react-select";

export default function UserSelect({
  selectedData,
  setSelectedData,
  label,
}: {
  selectedData?: any;
  setSelectedData: any;
  label: string;
}) {
  const [search, setSearch] = useState("");
  const [searchedData, setSearchedData] = useState<DealInterface[]>([]);
  const [getUsers, { isLoading, isFetching, isError }] = useLazyGetUsersQuery();

  const handleChange = async (selectedOptions: any) => {
    setSelectedData(selectedOptions);
  };

  useEffect(() => {
    const searchDataFn = async (search: string) => {
      const res = await getUsers({ search: search, data: true });
      const options: any = [];

      if (!res.data) return;
      res.data.map((item: UserInterface) => {
        options.push({ label: item.fullname, value: item._id });
      });
      setSearchedData(options);
    };
    const interval = setTimeout(
      () => search.length > 2 && searchDataFn(search),
      500
    );
    return () => {
      clearTimeout(interval);
    };
  }, [search, getUsers]);

  useEffect(() => {
    const preFetchData = async () => {
      const { data } = await getUsers({ data: true });
      if (data?.data?.length !== 0) {
        const items = data.data.map((item: UserInterface) => {
          return {
            label: item.fullname,
            value: item._id,
          };
        });
        setSearchedData(items);
      }
    };
    preFetchData();
  }, [getUsers]);

  return (
    <div className="mb-5">
      <label className="block mb-1 text-sm">{label ?? "Performer"}</label>
      <Select
        classNamePrefix="select"
        id="user"
        name="user"
        placeholder={label ?? "Select Performer"}
        value={selectedData}
        isLoading={isFetching || isLoading}
        options={searchedData}
        onChange={handleChange}
        onInputChange={(value) => setSearch(value)}
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
