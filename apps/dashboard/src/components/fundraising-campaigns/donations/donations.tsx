import { DonationsStats } from './donations-stats';
import { DonationsTable } from './donations-table';
import { ReloadDonationsButton } from './reload-donations-button';
import { DonationsProvider } from '@components/providers';
import { useFundraisingCampaign } from '@myhearty/hooks/queries';
import { useRouter } from 'next/router';

export function Donations() {
  const router = useRouter();
  const { slug } = router.query;

  const { fundraisingCampaign } = useFundraisingCampaign(slug as string);

  return (
    <DonationsProvider fundraisingCampaignIdOrSlug={slug as string}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-lg font-medium">{fundraisingCampaign?.name}</span>
        <ReloadDonationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <DonationsStats />
        <DonationsTable />
      </div>
    </DonationsProvider>
  );
}
