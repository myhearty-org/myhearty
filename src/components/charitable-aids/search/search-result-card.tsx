import { Button } from '@components/ui/button';
import { CalendarXIcon } from '@components/ui/icons';
import { ProgressBar } from '@components/ui/progress-bar';
import { LocationMarkerIcon } from '@heroicons/react/solid';
import { useHasMounted } from '@hooks/index';
import { calculatePercentage } from '@utils/common';
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
        receiverCount={hit.receiver_count}
        applicationDeadline={hit.application_deadline}
        imageUrl={hit.image_url}
      />
      <CardBody
        name={hit.name}
        organization={hit.organization}
        applicationDeadline={hit.application_deadline}
        location={hit.location}
      />
    </a>
  );
}

type CardHeaderProps = {
  openings: number;
  receiverCount: number;
  applicationDeadline: number;
  imageUrl: string;
};

function CardHeader({ openings, receiverCount, applicationDeadline, imageUrl }: CardHeaderProps) {
  const currentDatetime = new Date();
  const dayCount = Math.max(differenceInDays(fromUnixTime(applicationDeadline), currentDatetime), 0);
  const countPercentage = calculatePercentage(receiverCount, openings);

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
          aided {receiverCount.toLocaleString()} {pluralize('receiver', receiverCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={countPercentage} />
        <div className="flex justify-between text-sm">
          <span>
            {dayCount.toLocaleString()} {pluralize('more day', dayCount)}
          </span>
          <span>
            {(openings - receiverCount).toLocaleString()} {pluralize('opening', openings - receiverCount)}{' '}
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
  applicationDeadline: number;
  location: string;
};

function CardBody({ name, organization, applicationDeadline, location }: CardBodyProps) {
  return (
    <div className="flex h-auto flex-1 flex-col justify-start gap-px p-3">
      <h2 className="break-words text-lg font-medium line-clamp-2">{name}</h2>
      <p className="text-sm text-gray-500 line-clamp-1">By {organization}</p>
      <div className="mt-2.5 flex flex-col gap-2">
        <div className="flex">
          <CalendarXIcon className="mr-3 h-6 w-6 flex-shrink-0 fill-pink-600" />
          <span className="text-sm">
            {format(fromUnixTime(applicationDeadline), 'E, d MMM yyyy, hh:mm a')}
          </span>
        </div>
        <div className="flex">
          <LocationMarkerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
      <div className="mt-3 flex flex-1 flex-col items-center justify-end">
        <Button type="button" size="sm">
          Apply
        </Button>
      </div>
    </div>
  );
}
