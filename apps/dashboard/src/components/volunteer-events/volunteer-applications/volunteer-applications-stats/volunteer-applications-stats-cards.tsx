import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage } from '@myhearty/utils/common';
import pluralize from 'pluralize';

type OpeningsCardProps = {
  openings: number;
  volunteerCount: number;
};

export function OpeningsCard({ openings, volunteerCount }: OpeningsCardProps) {
  const countPercentage = calculatePercentage(volunteerCount, openings);

  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Openings</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">
          {openings.toLocaleString()} {pluralize('opening', openings)}
        </h2>
        <p className="text-sm">
          joined by {volunteerCount.toLocaleString()} {pluralize('volunteer', volunteerCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={countPercentage} />
        <p className="text-sm">
          {(openings - volunteerCount).toLocaleString()} {pluralize('opening', openings - volunteerCount)}{' '}
          left
        </p>
      </div>
    </div>
  );
}

type VolunteerCountCardProps = {
  volunteerCount: number;
};

export function VolunteerCountCard({ volunteerCount }: VolunteerCountCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Volunteers</h2>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-2xl font-medium">{volunteerCount.toLocaleString()}</p>
      </div>
    </div>
  );
}

type ApplicantCountCardProps = {
  applicantCount: number;
};

export function ApplicantCountCard({ applicantCount }: ApplicantCountCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded border border-gray-200 bg-white py-3 px-6 shadow-sm">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Applicants</h2>
      <div className="flex h-full flex-col items-center justify-center">
        <p className="text-2xl font-medium">{applicantCount.toLocaleString()}</p>
      </div>
    </div>
  );
}
