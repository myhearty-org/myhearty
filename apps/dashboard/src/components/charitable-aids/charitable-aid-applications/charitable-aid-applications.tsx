import { CharitableAidApplicationsTable } from './charitable-aid-applications-table';
import { CharitableAidApplicationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function CharitableAidApplications() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <CharitableAidApplicationsProvider charitableAidIdOrSlug={slug as string}>
      <div className="flex flex-col gap-6">
        <CharitableAidApplicationsTable />
      </div>
    </CharitableAidApplicationsProvider>
  );
}
