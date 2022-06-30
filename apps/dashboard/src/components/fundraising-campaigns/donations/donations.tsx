import { DonationsTable } from './donations-table';
import { DonationsProvider } from '@components/providers';
import { useRouter } from 'next/router';
import { ReloadDonationsButton } from './reload-donations-button';

export function Donations() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <DonationsProvider fundraisingCampaignIdOrSlug={slug as string}>
      <div className="mb-2 flex items-center justify-end gap-2">
        <ReloadDonationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <DonationsTable />
      </div>
    </DonationsProvider>
  );
}
