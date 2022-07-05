import { CharitableAidApplicationsStats } from './charitable-aid-applications-stats';
import { CharitableAidApplicationsTable } from './charitable-aid-applications-table';
import { ReloadCharitableAidApplicationsButton } from './reload-charitable-aid-applications-button';
import { CharitableAidApplicationsProvider } from '@components/providers';
import { useCharitableAid } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function CharitableAidApplications() {
  const router = useRouter();
  const { slug } = router.query;

  const { charitableAid } = useCharitableAid(slug as string);

  return (
    <CharitableAidApplicationsProvider charitableAidIdOrSlug={slug as string}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-lg font-medium">{charitableAid?.name}</span>
        <ReloadCharitableAidApplicationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <CharitableAidApplicationsStats />
        <CharitableAidApplicationsTable />
      </div>
    </CharitableAidApplicationsProvider>
  );
}
