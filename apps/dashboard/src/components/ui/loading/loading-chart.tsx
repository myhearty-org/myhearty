import { Skeleton } from '@mantine/core';

type LoadingChartProps = {
  title?: boolean;
};

export function LoadingChart({ title = true }: LoadingChartProps) {
  return title ? (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <div className="border-b border-gray-200 pb-1">
        <Skeleton className="w-2/5 rounded-md py-3" />
      </div>
      <LoadingVerticalBars />
    </div>
  ) : (
    <LoadingVerticalBars />
  );
}

function LoadingVerticalBars() {
  return (
    <div className="flex h-[350px] items-end justify-center gap-6">
      <Skeleton className="h-1/5 w-20 rounded-md" />
      <Skeleton className="h-2/5 w-20 rounded-md" />
      <Skeleton className="h-3/5 w-20 rounded-md" />
      <Skeleton className="h-4/5 w-20 rounded-md" />
      <Skeleton className="h-full w-20 rounded-md" />
    </div>
  );
}
