import { DonorCountCard, TotalRaisedAmountCard } from './donations-stats-cards';
import { LoadingStatsCard } from '@components/ui/loading';
import { useFundraisingCampaign } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function DonationsStats() {
  const router = useRouter();
  const { slug } = router.query;
  const { fundraisingCampaign, isLoading } = useFundraisingCampaign(slug as string);

  return (
    <div className="flex flex-col gap-6">
      {!fundraisingCampaign || isLoading ? (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <LoadingStatsCard />
          <LoadingStatsCard />
        </div>
      ) : (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <TotalRaisedAmountCard
            targetAmount={fundraisingCampaign.targetAmount}
            totalRaisedAmount={fundraisingCampaign.totalRaisedAmount}
          />
          <DonorCountCard donorCount={fundraisingCampaign.donorCount} />
        </div>
      )}
    </div>
  );
}
