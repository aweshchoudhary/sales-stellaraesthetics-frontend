import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function ModalLoader({}: Props) {
  return (
    <section className="p-5">
      <div className="flex flex-col gap-5">
        <Skeleton className="w-full h-[40px]" />
        <Skeleton className="w-full h-[40px]" />
        <div className="flex items-center gap-5">
          <Skeleton className="flex-1 h-[40px]" />
          <Skeleton className="flex-1 h-[40px]" />
          <Skeleton className="flex-1 h-[40px]" />
          <Skeleton className="flex-1 h-[40px]" />
        </div>
        <Skeleton className="w-full h-[100px]" />
        <Skeleton className="w-full h-[40px]" />
        <div className="flex items-center gap-3 mt-5">
          <Skeleton className="w-[100px] h-[40px]" />
          <Skeleton className="w-[100px] h-[40px]" />
        </div>
      </div>
    </section>
  );
}
