import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type Props = {};

const TableLoader = (props: Props) => {
  return (
    <>
      <div className="flex items-center justify-between mb-5">
        <Skeleton className="w-[250px] h-[25px]" />
        <Skeleton className="w-[100px] h-[25px]" />
      </div>
      <Table className="border">
        <TableCaption>
          <Skeleton className="w-[200px] h-[20px]" />
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[50px]">
              <Skeleton className="w-[50px] h-[20px]" />
            </TableHead>
            <TableHead className="w-[100px]">
              <Skeleton className="w-[160px] h-[20px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-[145px] h-[20px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-[120px] h-[20px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-[145px] h-[20px]" />
            </TableHead>
            <TableHead>
              <Skeleton className="w-[90px] h-[20px]" />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell>
              <Skeleton className="w-full h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[100px] h-[20px]" />
            </TableCell>
            <TableCell>
              <Skeleton className="w-[70px] h-[20px]" />
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default TableLoader;
