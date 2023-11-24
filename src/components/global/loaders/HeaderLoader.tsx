import { Skeleton } from "@/components/ui/skeleton";

const HeaderLoader = () => {
  return (
    <div className="flex items-center justify-between px-5 py-3 border-b">
      <div className="flex gap-3">
        <Skeleton className="w-[40px] h-[30px]" />
        <Skeleton className="w-[200px] h-[30px]" />
      </div>
      <div className="flex gap-3">
        <Skeleton className="w-[110px] h-[30px]" />
        <Skeleton className="w-[70px] h-[30px]" />
        <Skeleton className="w-[80px] h-[30px]" />
      </div>
    </div>
  );
};

export default HeaderLoader;
