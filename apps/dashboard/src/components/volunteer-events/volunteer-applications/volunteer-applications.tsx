import { ReloadVolunteerApplicationsButton } from './reload-volunteer-applications-button';
import { VolunteerApplicationsStats } from './volunteer-applications-stats';
import { VolunteerApplicationsTable } from './volunteer-applications-table';
import { VolunteerApplicationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function VolunteerApplications() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <VolunteerApplicationsProvider volunteerEventIdOrSlug={slug as string}>
      <div className="mb-2 flex items-center justify-end gap-2">
        <ReloadVolunteerApplicationsButton />
      </div>
      <div className="flex flex-col gap-6">
        <VolunteerApplicationsStats />
        <VolunteerApplicationsTable />
      </div>
    </VolunteerApplicationsProvider>
  );
}
