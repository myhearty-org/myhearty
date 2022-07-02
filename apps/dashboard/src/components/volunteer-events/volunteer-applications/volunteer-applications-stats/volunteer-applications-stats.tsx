import { ApplicantCountCard, OpeningsCard, VolunteerCountCard } from './volunteer-applications-stats-cards';
import { useVolunteerApplications } from '@components/providers';
import { LoadingStatsCard } from '@components/ui/loading';
import { useVolunteerEvent } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function VolunteerApplicationsStats() {
  const router = useRouter();
  const { slug } = router.query;
  const { volunteerEvent, isLoading: isVolunteerEventLoading } = useVolunteerEvent(slug as string);

  const { isLoading: isVolunteerApplicationsLoading, paginationMetadata } = useVolunteerApplications();

  return (
    <div className="flex flex-col gap-6">
      {!volunteerEvent || isVolunteerEventLoading || isVolunteerApplicationsLoading ? (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <LoadingStatsCard />
          <LoadingStatsCard />
          <LoadingStatsCard />
        </div>
      ) : (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <OpeningsCard openings={volunteerEvent.openings} volunteerCount={volunteerEvent.volunteerCount} />
          <VolunteerCountCard volunteerCount={volunteerEvent.volunteerCount} />
          <ApplicantCountCard applicantCount={paginationMetadata!.totalCount} />
        </div>
      )}
    </div>
  );
}
