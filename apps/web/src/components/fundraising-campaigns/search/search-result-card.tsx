import { Button } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage, toLocaleFixed } from '@myhearty/utils/common';
import differenceInDays from 'date-fns/differenceInDays';
import fromUnixTime from 'date-fns/fromUnixTime';
import pluralize from 'pluralize';

type SearchResultCardProps = {
  hit: any;
};

export function SearchResultCard({ hit }: SearchResultCardProps) {
  const hasMounted = useHasMounted();
  if (!hasMounted) return null;

  return (
    <a
      className="flex w-full max-w-[320px] shrink-0 grow basis-full flex-col rounded-md bg-white shadow-md transition hover:shadow-lg hover:drop-shadow-lg focus:rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 sm:max-w-[264px]"
      href={hit.page_url}
      target="_blank"
      rel="noreferrer">
      <CardHeader
        targetAmount={hit.target_amount}
        totalRaisedAmount={hit.total_raised_amount}
        donorCount={hit.donor_count}
        endDatetime={hit.end_datetime}
        imageUrl={hit.image_url}
      />
      <CardBody name={hit.name} organization={hit.organization} aboutCampaign={hit.about_campaign} />
    </a>
  );
}

type CardHeaderProps = {
  targetAmount: number;
  totalRaisedAmount: number;
  donorCount: number;
  endDatetime: number;
  imageUrl: string;
};

function CardHeader({ targetAmount, totalRaisedAmount, donorCount, endDatetime, imageUrl }: CardHeaderProps) {
  const currentDatetime = new Date();
  const dayCount = Math.max(differenceInDays(fromUnixTime(endDatetime), currentDatetime), 0);
  const amountPercentage = calculatePercentage(totalRaisedAmount, targetAmount);

  return (
    <div className="relative h-0 w-full overflow-hidden rounded-t-md pt-[75%]">
      <div
        className="absolute top-0 left-0 h-full w-full bg-cover bg-center after:absolute after:h-full after:w-full after:bg-gradient-to-t after:from-gray-700 after:opacity-30"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute bottom-0 z-10 w-full px-4 pb-2 font-medium text-white">
        <h2 className="text-2xl">RM{toLocaleFixed(totalRaisedAmount)}</h2>
        <p className="text-base">
          from {donorCount.toLocaleString()} {pluralize('donor', donorCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={amountPercentage} />
        <div className="flex justify-between text-sm">
          <span>
            {dayCount.toLocaleString()} {pluralize('day', dayCount)} left
          </span>
          <span>
            {amountPercentage}% of RM{toLocaleFixed(targetAmount, 0)}
          </span>
        </div>
      </div>
    </div>
  );
}

type CardBodyProps = {
  name: string;
  organization: string;
  aboutCampaign: string;
};

function CardBody({ name, organization, aboutCampaign }: CardBodyProps) {
  return (
    <div className="flex h-auto flex-1 flex-col justify-start gap-px p-3">
      <h2 className="line-clamp-2 break-words text-lg font-medium">{name}</h2>
      <p className="line-clamp-1 text-sm text-gray-500">By {organization}</p>
      <p className="text-sm">{aboutCampaign}</p>
      <div className="mt-3 flex flex-1 flex-col items-center justify-end">
        <Button>Donate</Button>
      </div>
    </div>
  );
}
