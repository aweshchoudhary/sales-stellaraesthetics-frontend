import { Skeleton } from "@/components/ui/skeleton";
import HeaderLoader from "./HeaderLoader";

const NewItemPageLoader = () => {
  return (
    <div>
      <HeaderLoader />
      <section className="p-10">
        <div className="flex flex-wrap justify-between gap-5">
          <div className="flex-1">
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
          </div>
          <div className="flex-1">
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
            <div className="mb-5">
              <Skeleton className="w-[200px] mb-2 h-[15px]" />
              <Skeleton className="flex-1 h-[30px]" />
            </div>
          </div>
          <div className="w-full flex gap-3">
            <Skeleton className="w-[120px] mb-2 h-[35px]" />
            <Skeleton className="w-[90px] mb-2 h-[35px]" />
          </div>
        </div>
      </section>
    </div>
  );
};

export default NewItemPageLoader;
