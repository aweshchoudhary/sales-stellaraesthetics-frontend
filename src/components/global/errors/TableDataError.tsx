import { Icon } from "@iconify/react";

const TableDataError = () => {
  return (
    <div className="p-5 w-full h-[500px]">
      <div className="w-full h-full border flex items-center justify-center">
        <div className="flex items-center gap-5 text-red-600">
          <div>
            <Icon icon="iconamoon:cloud-error-thin" className="text-7xl" />
          </div>
          <div>
            <h2 className="h3">Error while loading data</h2>
            <p className="text-muted-foreground">
              something went wrong. try again
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TableDataError;
