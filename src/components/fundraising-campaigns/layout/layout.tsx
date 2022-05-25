import { DonationButton } from './donation-button';
import { DonationSuccessfulDialog } from './donation-successful-dialog';
import { FundraisingCampaignsSlider } from './fundraising-campaigns-slider';
import { SanitizedHTML } from '@components/helpers';
import { CategoriesCard, DateAndTimeCard, OrganizationCard } from '@components/ui/cards';
import { Gallery } from '@components/ui/gallery';
import { ProgressBar } from '@components/ui/progress-bar';
import { FundraisingCampaign } from '@lib/types';
import { calculatePercentage, toLocaleFixed } from '@utils/common';
import pluralize from 'pluralize';

type LayoutProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export function Layout({ fundraisingCampaign }: LayoutProps) {
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
      <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
        <div className="mx-4 flex flex-col gap-6 md:mx-8 lg:mx-16">
          <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
            <div className="flex flex-col gap-6 md:col-span-2">
              <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">{name}</h1>
              <Gallery name={name} imageUrl={imageUrl} />
              <AboutCampaignCard aboutCampaign={aboutCampaign} />
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

type AboutCampaignCardProps = {
  aboutCampaign: string;
};

function AboutCampaignCard({ aboutCampaign }: AboutCampaignCardProps) {
  return (
    <div className="mx-[-1rem] flex w-[calc(100%+2rem)] flex-col gap-4 border-0 border-gray-200 bg-white py-3 px-3 shadow-md md:mx-0 md:w-full md:rounded-md md:border md:px-6">
      <h2 className="border-b border-gray-200 pb-1 text-lg font-medium">About Campaign</h2>
      <SanitizedHTML className="prose tracking-tight" html={aboutCampaign} />
    </div>
  );
}
