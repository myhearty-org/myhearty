import { CharitableAidApplicationsStats } from './charitable-aid-applications-stats';
import { CharitableAidApplicationsTable } from './charitable-aid-applications-table';
import { ReloadCharitableAidApplicationsButton } from './reload-charitable-aid-applications-button';
import { CharitableAidApplicationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function CharitableAidApplications() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <CharitableAidApplicationsProvider charitableAidIdOrSlug={slug as string}>
      <div className="mb-2 flex items-center justify-end gap-2">
        <ReloadCharitableAidApplicationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <CharitableAidApplicationsStats />
        <CharitableAidApplicationsTable />
      </div>
    </CharitableAidApplicationsProvider>
  );
}
