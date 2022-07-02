import { DonationsChart } from './donations-chart';
import { DonorCountCard, TotalRaisedAmountCard } from './donations-stats-cards';
import { LoadingChart, LoadingStatsCard } from '@components/ui/loading';
import { useFundraisingCampaign, useMetrics } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function DonationsStats() {
  const router = useRouter();
  const { slug } = router.query;
  
  const { fundraisingCampaign, isLoading: isFundraisingCampaignLoading } = useFundraisingCampaign(
    slug as string
  );
  const { metrics, isLoading: isMetricsLoading } = useMetrics(slug as string);

  return (
    <div className="flex flex-col gap-6">
      {!fundraisingCampaign || isFundraisingCampaignLoading || !metrics || isMetricsLoading ? (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <LoadingStatsCard />
          <LoadingStatsCard />
          <div className="sm:col-span-2 xl:col-span-3">
            <LoadingChart />
          </div>
        </div>
      ) : (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <TotalRaisedAmountCard
            targetAmount={fundraisingCampaign.targetAmount}
            totalRaisedAmount={fundraisingCampaign.totalRaisedAmount}
          />
          <DonorCountCard donorCount={fundraisingCampaign.donorCount} />
          <div className="sm:col-span-2 xl:col-span-3">
            <DonationsChart metrics={metrics} />
          </div>
        </div>
      )}
    </div>
  );
}
