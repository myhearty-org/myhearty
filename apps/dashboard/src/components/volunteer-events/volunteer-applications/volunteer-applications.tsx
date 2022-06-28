import { VolunteerApplicationsTable } from './volunteer-applications-table';
import { VolunteerApplicationsProvider } from '@components/providers';
import { useRouter } from 'next/router';

export function VolunteerApplications() {
  const router = useRouter();
  const { slug } = router.query;

  return (
    <VolunteerApplicationsProvider volunteerEventIdOrSlug={slug as string}>
      <div className="flex flex-col gap-6">
        <VolunteerApplicationsTable />
      </div>
    </VolunteerApplicationsProvider>
  );
}
