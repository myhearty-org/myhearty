import { ApplicationButton, CharitableAidsSlider } from '@components/charitable-aids';
import { getCharitableAid } from '@myhearty/lib/charitable-aids';
import { CharitableAid } from '@myhearty/lib/types';
import {
  ApplicationDeadlineCard,
  CategoriesCard,
  ContentCard,
  LocationCard,
  OrganizationCard,
} from '@myhearty/ui/cards';
import { Gallery } from '@myhearty/ui/gallery';
import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage } from '@myhearty/utils/common';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import pluralize from 'pluralize';

type CharitableAidPageProps = {
  charitableAid: CharitableAid;
};

export default function CharitableAidPage({ charitableAid }: CharitableAidPageProps) {
  const {
    id,
    name,
    openings,
    receiverCount,
    location,
    aboutAid,
    categories,
    imageUrl,
    applicationDeadline,
    applicationClosed,
    organization,
  } = charitableAid;

  return (
    <>
      <NextSeo title={charitableAid.name} />
      <div className="grow">
        <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
          <div className="mx-4 flex flex-col gap-6 md:mx-8 lg:mx-16">
            <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
              <div className="flex flex-col gap-6 md:col-span-2">
                <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">
                  {name}
                </h1>
                <Gallery name={name} imageUrl={imageUrl} />
                <ContentCard content={aboutAid} />
              </div>
              <div className="flex flex-col gap-6 md:col-span-1">
                <OpeningsCard openings={openings} receiverCount={receiverCount} />
                <ApplicationDeadlineCard applicationDeadline={applicationDeadline} />
                <ApplicationButton
                  charitableAidId={id}
                  charitableAidName={name}
                  applicationDeadline={applicationDeadline}
                  applicationClosed={applicationClosed}
                />
                <LocationCard location={location} />
                <CategoriesCard categories={categories} />
                <OrganizationCard organization={organization} />
              </div>
            </div>
            <CharitableAidsSlider charitableAid={charitableAid} />
          </div>
        </div>
      </div>
    </>
  );
}

type OpeningsCardProps = {
  openings: number;
  receiverCount: number;
};

function OpeningsCard({ openings, receiverCount }: OpeningsCardProps) {
  const countPercentage = calculatePercentage(receiverCount, openings);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Openings</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">
          {openings.toLocaleString()} {pluralize('opening', openings)}
        </h2>
        <p className="text-sm">
          aided {receiverCount.toLocaleString()} {pluralize('receiver', receiverCount)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={countPercentage} />
        <p className="text-sm">
          {(openings - receiverCount).toLocaleString()} {pluralize('opening', openings - receiverCount)} left
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ params, locale }) {
  try {
    const charitableAid = await getCharitableAid(params?.slug as string);

    if (!charitableAid.published) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        charitableAid,
        ...(await serverSideTranslations(locale!, ['validation'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
