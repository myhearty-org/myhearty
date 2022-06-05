import { CalendarIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage } from '@myhearty/utils/common';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
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
      className="flex max-w-[320px] shrink-0 grow basis-full flex-col rounded-md bg-white shadow-md transition hover:shadow-lg hover:drop-shadow-lg focus:rounded-md focus:outline-none focus:ring-4 focus:ring-pink-300 sm:max-w-[264px]"
      href={hit.page_url}
      target="_blank"
      rel="noreferrer">
      <CardHeader
        openings={hit.openings}
        volunteerCount={hit.volunteer_count}
        startDatetime={hit.start_datetime}
        imageUrl={hit.image_url}
      />
      <CardBody
        name={hit.name}
        organization={hit.organization}
        startDatetime={hit.start_datetime}
        endDatetime={hit.end_datetime}
        location={hit.location}
      />
    </a>
  );
}

type CardHeaderProps = {
  openings: number;
  volunteerCount: number;
  startDatetime: number;
  imageUrl: string;
};

function CardHeader({ openings, volunteerCount, startDatetime, imageUrl }: CardHeaderProps) {
  const currentDatetime = new Date();
  const dayCount = Math.max(differenceInDays(fromUnixTime(startDatetime), currentDatetime), 0);
  const countPercentage = calculatePercentage(volunteerCount, openings);

  return (
    <div className="relative h-0 w-full overflow-hidden rounded-t-md pt-[75%]">
      <div
        className="absolute top-0 left-0 h-full w-full bg-cover bg-center after:absolute after:h-full after:w-full after:bg-gradient-to-t after:from-gray-700 after:opacity-30"
        style={{ backgroundImage: `url(${imageUrl})` }}
      />
      <div className="absolute bottom-0 z-10 w-full px-4 pb-2 font-medium text-white">
        <h2 className="text-2xl">
          {openings.toLocaleString()} {pluralize('opening', openings)}
        </h2>
        <p className="text-base">
          joined by {volunteerCount.toLocaleString()} {pluralize('volunteer', volunteerCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={countPercentage} />
        <div className="flex justify-between text-sm">
          <span>
            {dayCount.toLocaleString()} {pluralize('more day', dayCount)}
          </span>
          <span>
            {(openings - volunteerCount).toLocaleString()} {pluralize('opening', openings - volunteerCount)}{' '}
            left
          </span>
        </div>
      </div>
    </div>
  );
}

type CardBodyProps = {
  name: string;
  organization: string;
  startDatetime: number;
  endDatetime: number;
  location: string;
};

function CardBody({ name, organization, startDatetime, endDatetime, location }: CardBodyProps) {
  return (
    <div className="flex h-auto flex-1 flex-col justify-start gap-px p-3">
      <h2 className="line-clamp-2 break-words text-lg font-medium">{name}</h2>
      <p className="line-clamp-1 text-sm text-gray-500">By {organization}</p>
      <div className="mt-2.5 flex flex-col gap-2">
        <div className="flex">
          <CalendarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            <p>{format(fromUnixTime(startDatetime), 'E, d MMM yyyy, hh:mm a')} –</p>
            <p>{format(fromUnixTime(endDatetime), 'E, d MMM yyyy, hh:mm a')}</p>
          </span>
        </div>
        <div className="flex">
          <LocationMarkerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col items-center justify-end">
        <Button>
          Apply
        </Button>
      </div>
    </div>
  );
}
