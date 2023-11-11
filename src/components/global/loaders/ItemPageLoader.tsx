import { Skeleton } from "@/components/ui/skeleton";
import HeaderLoader from "./HeaderLoader";

const ItemPageLoader = () => {
  return (
    <div>
      <HeaderLoader />
      <section className="p-5">
        <div className="flex items-center gap-5">
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
          <Skeleton className="w-[100px] h-[30px]" />
        </div>
        <div className="flex flex-wrap justify-between gap-5 mt-10">
          <div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
          </div>
          <div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[200px] h-[20px]" />
              <Skeleton className="w-[300px] h-[20px]" />
            </div>
          </div>
          <div className="w-full">
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
            <div className="flex gap-5 mb-5">
              <Skeleton className="w-[300px] h-[20px]" />
              <Skeleton className="flex-1 h-[20px]" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ItemPageLoader;
