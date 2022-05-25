import { SanitizedHTML } from '@components/helpers';
import {
  ApplicationDeadlineCard,
  CategoriesCard,
  DateAndTimeCard,
  LocationCard,
  OrganizationCard,
} from '@components/ui/cards';
import { Gallery } from '@components/ui/gallery';
import { ProgressBar } from '@components/ui/progress-bar';
import { ApplicationButton, VolunteerEventsSlider } from '@components/volunteer-events';
import { VolunteerEvent } from '@lib/types';
import { getVolunteerEvent } from '@lib/volunteer-events';
import { calculatePercentage } from '@utils/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import pluralize from 'pluralize';

type VolunteerEventPageProps = {
  volunteerEvent: VolunteerEvent;
};

export default function VolunteerEventPage({ volunteerEvent }: VolunteerEventPageProps) {
  const {
    id,
    name,
    openings,
    volunteerCount,
    location,
    aboutEvent,
    categories,
    imageUrl,
    startDatetime,
    endDatetime,
    applicationDeadline,
    applicationClosed,
    organization,
  } = volunteerEvent;

  return (
    <>
      <NextSeo title={volunteerEvent.name} />
      <div className="grow">
        <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
          <div className="mx-4 flex flex-col gap-6 md:mx-8 lg:mx-16">
            <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
              <div className="flex flex-col gap-6 md:col-span-2">
                <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">
                  {name}
                </h1>
                <Gallery name={name} imageUrl={imageUrl} />
                <AboutEventCard aboutEvent={aboutEvent} />
              </div>
              <div className="flex flex-col gap-6 md:col-span-1">
                <OpeningsCard openings={openings} volunteerCount={volunteerCount} />
                <ApplicationDeadlineCard applicationDeadline={applicationDeadline} />
                <ApplicationButton
                  volunteerEventId={id}
                  volunteerEventName={name}
                  applicationClosed={applicationClosed}
                />
                <DateAndTimeCard startDatetime={startDatetime} endDatetime={endDatetime} />
                <LocationCard location={location} />
                <CategoriesCard categories={categories} />
                <OrganizationCard organization={organization} />
              </div>
            </div>
            <VolunteerEventsSlider volunteerEvent={volunteerEvent} />
          </div>
        </div>
        );
      </div>
    </>
  );
}

type OpeningsCardProps = {
  openings: number;
  volunteerCount: number;
};

function OpeningsCard({ openings, volunteerCount }: OpeningsCardProps) {
  const countPercentage = calculatePercentage(volunteerCount, openings);

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
        <ProgressBar className="my-1" color="bg-pink-500" percentage={countPercentage} />
        <p className="text-sm">
          {(openings - volunteerCount).toLocaleString()} {pluralize('opening', openings - volunteerCount)}{' '}
          left
        </p>
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

export const getServerSideProps: GetServerSideProps = async function ({ params, locale }) {
  try {
    const volunteerEvent = await getVolunteerEvent(params?.slug as string);

    if (!volunteerEvent.published) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        volunteerEvent,
        ...(await serverSideTranslations(locale!, ['validation'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
