import { DonationsStats } from './donations-stats';
import { DonationsTable } from './donations-table';
import { ReloadDonationsButton } from './reload-donations-button';
import { DonationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function Donations() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <DonationsProvider fundraisingCampaignIdOrSlug={slug as string}>
      <div className="mb-2 flex items-center justify-end gap-2">
        <ReloadDonationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <DonationsStats />
        <DonationsTable />
      </div>
    </DonationsProvider>
  );
}
