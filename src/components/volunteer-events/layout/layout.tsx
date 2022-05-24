import { ApplicationButton } from './application-button';
import { VolunteerEventsSlider } from './volunteer-events-slider';
import { SanitizedHTML } from '@components/helpers';
import { ApplicationDeadlineCard, CategoriesCard, OrganizationCard } from '@components/ui/cards';
import { ProgressBar } from '@components/ui/progress-bar';
import { CalendarIcon, ClockIcon, LocationMarkerIcon } from '@heroicons/react/solid';
import { VolunteerEvent } from '@lib/types';
import { calculate_percentage } from '@utils/common';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import Image from 'next/image';
import pluralize from 'pluralize';

type GalleryProps = {
  name: string;
  imageUrl: string;
};

function Gallery({ name, imageUrl }: GalleryProps) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-gray-200 shadow-md">
      <Image
        src={imageUrl}
        alt={`Image for ${name}`}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
  );
}

type OpeningsCardProps = {
  openings: number;
  volunteerCount: number;
};

function OpeningsCard({ openings, volunteerCount }: OpeningsCardProps) {
  const count_percentage = calculate_percentage(volunteerCount, openings);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Openings</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">
          {openings.toLocaleString()} {pluralize('opening', openings)}
        </h2>
        <p className="text-sm">
          joined by {volunteerCount.toLocaleString()} {pluralize('volunteer', volunteerCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={count_percentage} />
        <p className="text-sm">
          {(openings - volunteerCount).toLocaleString()} {pluralize('opening', openings - volunteerCount)}{' '}
          left
        </p>
      </div>
    </div>
  );
}

type DateAndTimeCardProps = {
  startDatetime: string;
  endDatetime: string;
};

function DateAndTimeCard({ startDatetime, endDatetime }: DateAndTimeCardProps) {
  const current_datetime = new Date();
  const day_count = Math.max(differenceInDays(new Date(endDatetime), current_datetime), 0);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Date and Time</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <CalendarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            <p>{format(new Date(startDatetime), 'E, d MMM yyyy, hh:mm a')} –</p>
            <p>{format(new Date(endDatetime), 'E, d MMM yyyy, hh:mm a')}</p>
          </span>
        </div>
        <div className="flex">
          <ClockIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            {day_count.toLocaleString()} {pluralize('day', day_count)} left
          </span>
        </div>
      </div>
    </div>
  );
}

type LocationCardProps = {
  location: string;
};

function LocationCard({ location }: LocationCardProps) {
  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Location</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <LocationMarkerIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">{location}</span>
        </div>
      </div>
    </div>
  );
}

type AboutEventCardProps = {
  aboutEvent: string;
};

function AboutEventCard({ aboutEvent }: AboutEventCardProps) {
  return (
    <div className="mx-[-1rem] flex w-[calc(100%+2rem)] flex-col gap-4 border-0 border-gray-200 bg-white py-3 px-3 shadow-md md:mx-0 md:w-full md:rounded-md md:border md:px-6">
      <h2 className="border-b border-gray-200 pb-1 text-lg font-medium">About Event</h2>
      <SanitizedHTML className="prose tracking-tight" html={aboutEvent} />
    </div>
  );
}

type LayoutProps = {
  volunteerEvent: VolunteerEvent;
};

export function Layout({ volunteerEvent }: LayoutProps) {
  const {
    id,
    name,
    openings,
    volunteer_count,
    location,
    about_event,
    categories,
    image_url,
    start_datetime,
    end_datetime,
    application_deadline,
    application_closed,
    organization,
  } = volunteerEvent;

  return (
    <>
      <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
        <div className="mx-4 flex flex-col gap-6 md:mx-8 lg:mx-16">
          <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
            <div className="flex flex-col gap-6 md:col-span-2">
              <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">{name}</h1>
              <Gallery name={name} imageUrl={image_url} />
              <AboutEventCard aboutEvent={about_event} />
            </div>
            <div className="flex flex-col gap-6 md:col-span-1">
              <OpeningsCard openings={openings} volunteerCount={volunteer_count} />
              <ApplicationDeadlineCard applicationDeadline={application_deadline} />
              <ApplicationButton
                volunteerEventId={id}
                volunteerEventName={name}
                applicationClosed={application_closed}
              />
              <DateAndTimeCard startDatetime={start_datetime} endDatetime={end_datetime} />
              <LocationCard location={location} />
              <CategoriesCard categories={categories} />
              <OrganizationCard organization={organization} />
            </div>
          </div>
          <VolunteerEventsSlider volunteerEvent={volunteerEvent} />
        </div>
      </div>
    </>
  );
}
