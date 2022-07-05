import { ReloadVolunteerApplicationsButton } from './reload-volunteer-applications-button';
import { VolunteerApplicationsStats } from './volunteer-applications-stats';
import { VolunteerApplicationsTable } from './volunteer-applications-table';
import { VolunteerApplicationsProvider } from '@components/providers';
import { useVolunteerEvent } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function VolunteerApplications() {
  const router = useRouter();
  const { slug } = router.query;

  const { volunteerEvent } = useVolunteerEvent(slug as string);

  return (
    <VolunteerApplicationsProvider volunteerEventIdOrSlug={slug as string}>
      <div className="mb-3 flex items-center justify-between gap-2">
        <span className="truncate text-lg font-medium">{volunteerEvent?.name}</span>
        <ReloadVolunteerApplicationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <VolunteerApplicationsStats />
        <VolunteerApplicationsTable />
      </div>
    </VolunteerApplicationsProvider>
  );
}
