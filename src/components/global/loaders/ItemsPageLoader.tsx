import { Skeleton } from "@/components/ui/skeleton";
import React from "react";
import TableLoader from "./TableLoader";
import HeaderLoader from "./HeaderLoader";

type Props = {};

const ItemsPageLoader = (props: Props) => {
  return (
    <div>
      <HeaderLoader />
      <section className="p-5">
        <TableLoader />
      </section>
    </div>
  );
};

export default ItemsPageLoader;
