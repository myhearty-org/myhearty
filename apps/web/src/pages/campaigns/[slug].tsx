import {
  DonationButton,
  DonationSuccessfulDialog,
  FundraisingCampaignsSlider,
} from '@components/fundraising-campaigns';
import { getFundraisingCampaign } from '@myhearty/lib/fundraising-campaigns';
import { FundraisingCampaign } from '@myhearty/lib/types';
import { CategoriesCard, ContentCard, DateAndTimeCard, OrganizationCard } from '@myhearty/ui/cards';
import { Gallery } from '@myhearty/ui/gallery';
import { ProgressBar } from '@myhearty/ui/progress-bar';
import { calculatePercentage, toLocaleFixed } from '@myhearty/utils/common';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import pluralize from 'pluralize';

type FundraisingCampaignPageProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export default function FundraisingCampaignPage({ fundraisingCampaign }: FundraisingCampaignPageProps) {
  const {
    id,
    name,
    targetAmount,
    totalRaisedAmount,
    donorCount,
    aboutCampaign,
    categories,
    imageUrl,
    startDatetime,
    endDatetime,
    organization,
  } = fundraisingCampaign;
  return (
    <>
      <NextSeo title={fundraisingCampaign.name} />
      <div className="grow">
        <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
          <div className="mx-4 flex flex-col gap-6 md:mx-8 lg:mx-16">
            <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
              <div className="flex flex-col gap-6 md:col-span-2">
                <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">
                  {name}
                </h1>
                <Gallery name={name} imageUrl={imageUrl} />
                <ContentCard content={aboutCampaign} />
              </div>
              <div className="flex flex-col gap-6 md:col-span-1">
                <TotalRaisedAmountCard
                  targetAmount={targetAmount}
                  totalRaisedAmount={totalRaisedAmount}
                  donorCount={donorCount}
                />
                <DonationButton fundraisingCampaignId={id} organization={organization} />
                <DateAndTimeCard startDatetime={startDatetime} endDatetime={endDatetime} />
                <CategoriesCard categories={categories} />
                <OrganizationCard organization={organization} />
              </div>
            </div>
            <FundraisingCampaignsSlider fundraisingCampaign={fundraisingCampaign} />
          </div>
        </div>
        <DonationSuccessfulDialog />
      </div>
    </>
  );
}

type TotalRaisedAmountCardProps = {
  targetAmount: number;
  totalRaisedAmount: number;
  donorCount: number;
};

function TotalRaisedAmountCard({ targetAmount, totalRaisedAmount, donorCount }: TotalRaisedAmountCardProps) {
  const amountPercentage = calculatePercentage(totalRaisedAmount, targetAmount);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Raised Amount</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">RM{toLocaleFixed(totalRaisedAmount)} raised</h2>
        <p className="text-sm">
          {amountPercentage}% of RM{toLocaleFixed(targetAmount, 0)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={amountPercentage} />
        <p className="text-sm">
          from {donorCount.toLocaleString()} {pluralize('donor', donorCount)}
        </p>
      </div>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ params }) {
  try {
    const fundraisingCampaign = await getFundraisingCampaign(params?.slug as string);

    if (!fundraisingCampaign.published) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        fundraisingCampaign,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
