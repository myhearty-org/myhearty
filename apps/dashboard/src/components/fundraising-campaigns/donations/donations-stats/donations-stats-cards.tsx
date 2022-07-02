import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage, toLocaleFixed } from '@myhearty/utils/common';

type TotalRaisedAmountCardProps = {
  targetAmount: number;
  totalRaisedAmount: number;
};

export function TotalRaisedAmountCard({ targetAmount, totalRaisedAmount }: TotalRaisedAmountCardProps) {
  const amountPercentage = calculatePercentage(totalRaisedAmount, targetAmount);

  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Raised Amount</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">RM{toLocaleFixed(totalRaisedAmount)} raised</h2>
        <p className="text-sm">
          {amountPercentage}% of RM{toLocaleFixed(targetAmount, 0)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={amountPercentage} />
      </div>
    </div>
  );
}

type DonorCountCardProps = {
  donorCount: number;
};

export function DonorCountCard({ donorCount }: DonorCountCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Donors</h2>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-2xl font-medium">{donorCount.toLocaleString()}</p>
      </div>
    </div>
  );
}
