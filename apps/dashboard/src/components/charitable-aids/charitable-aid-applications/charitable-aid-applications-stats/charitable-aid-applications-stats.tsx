import {
  ApplicantCountCard,
  OpeningsCard,
  ReceiverCountCard,
} from './charitable-aid-applications-stats-cards';
import { useCharitableAidApplications } from '@components/providers';
import { LoadingStatsCard } from '@components/ui/loading';
import { useCharitableAid } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function CharitableAidApplicationsStats() {
  const router = useRouter();
  const { slug } = router.query;

  const { charitableAid, isLoading: isCharitableAidLoading } = useCharitableAid(slug as string);
  const { isLoading: isCharitableAidApplicationsLoading, paginationMetadata } =
    useCharitableAidApplications();

  return (
    <div className="flex flex-col gap-6">
      {!charitableAid || isCharitableAidLoading || isCharitableAidApplicationsLoading ? (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <LoadingStatsCard />
          <LoadingStatsCard />
          <LoadingStatsCard />
        </div>
      ) : (
        <div className="mx-auto grid w-full grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          <OpeningsCard openings={charitableAid.openings} receiverCount={charitableAid.receiverCount} />
          <ReceiverCountCard receiverCount={charitableAid.receiverCount} />
          <ApplicantCountCard applicantCount={paginationMetadata!.totalCount} />
        </div>
      )}
    </div>
  );
}
