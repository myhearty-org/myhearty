import { DonationsTable } from './donations-table';
import { DonationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function Donations() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <DonationsProvider fundraisingCampaignIdOrSlug={slug as string}>
      <div className="flex flex-col gap-6">
        <DonationsTable />
      </div>
    </DonationsProvider>
  );
}
