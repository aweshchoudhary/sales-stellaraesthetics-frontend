import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

export default function Loading({}: Props) {
  return (
    <div className="h-screen w-screen flex justify-center p-10">
      <div className="p-10 border w-1/2">
        <Skeleton className="w-full h-[20px] rounded" />

        <Skeleton className="w-full h-[10px] rounded mt-10" />
        <Skeleton className="w-full h-[10px] rounded mt-10" />
      </div>
    </div>
  );
}
