import { Skeleton } from '@mantine/core';

export function LoadingStatsCard() {
  return (
    <div className="flex h-[140px] w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1">
        <Skeleton className="w-3/5 rounded-md py-3" />
      </h2>
      <div className="flex h-full flex-col">
        <Skeleton className="h-full w-full rounded-md py-3" />
      </div>
    </div>
  );
}
