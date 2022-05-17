import { DonationButton } from './donation-button';
import { DonationSuccessfulDialog } from './donation-successful-dialog';
import { FundraisingCampaignsSlider } from './fundraising-campaigns-slider';
import { SanitizedHTML } from '@components/helpers';
import { CategoriesCard, OrganizationCard } from '@components/ui/cards';
import { ProgressBar } from '@components/ui/progress-bar';
import { CalendarIcon, ClockIcon } from '@heroicons/react/solid';
import { FundraisingCampaign } from '@lib/types';
import { calculate_percentage, toLocaleFixed } from '@utils/common';
import differenceInDays from 'date-fns/differenceInDays';
import format from 'date-fns/format';
import Image from 'next/image';
import pluralize from 'pluralize';

type GalleryProps = {
  name: string;
  image_url: string;
};

function Gallery({ name, image_url }: GalleryProps) {
  return (
    <div className="relative aspect-[3/2] w-full overflow-hidden rounded-md border border-gray-200 shadow-md">
      <Image
        src={image_url}
        alt={`Image for ${name}`}
        layout="fill"
        objectFit="cover"
        quality={100}
        priority
      />
    </div>
  );
}

type TotalRaisedAmountCardProps = {
  target_amount: number;
  total_raised_amount: number;
  donor_count: number;
};

function TotalRaisedAmountCard({
  target_amount,
  total_raised_amount,
  donor_count,
}: TotalRaisedAmountCardProps) {
  const amount_percentage = calculate_percentage(total_raised_amount, target_amount);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Total Raised Amount</h2>
      <div className="flex flex-col gap-1 font-medium">
        <h2 className="text-lg lg:text-xl">RM{toLocaleFixed(total_raised_amount)} raised</h2>
        <p className="text-sm">
          {amount_percentage}% of RM{toLocaleFixed(target_amount, 0)}
        </p>
        <ProgressBar className="my-1" color="bg-pink-500" percentage={amount_percentage} />
        <p className="text-sm">
          from {donor_count.toLocaleString()} {pluralize('donor', donor_count)}
        </p>
      </div>
    </div>
  );
}

type DateAndTimeCardProps = {
  start_datetime: string;
  end_datetime: string;
};

function DateAndTimeCard({ start_datetime, end_datetime }: DateAndTimeCardProps) {
  const current_datetime = new Date();
  const day_count = Math.max(differenceInDays(new Date(end_datetime), current_datetime), 0);

  return (
    <div className="flex w-full flex-col gap-4 rounded-md border border-gray-200 bg-white py-3 px-6 shadow-md">
      <h2 className="border-b border-gray-200 pb-1 font-medium">Date and Time</h2>
      <div className="flex flex-col gap-1">
        <div className="flex">
          <CalendarIcon className="mr-3 h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="text-sm">
            <p>{format(new Date(start_datetime), 'E, d MMM yyyy, hh:mm a')} –</p>
            <p>{format(new Date(end_datetime), 'E, d MMM yyyy, hh:mm a')}</p>
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

type AboutCampaignCardProps = {
  about_campaign: string;
};

function AboutCampaignCard({ about_campaign }: AboutCampaignCardProps) {
  return (
    <div className="mx-[-1rem] flex w-[calc(100%+2rem)] flex-col gap-4 border-0 border-gray-200 bg-white py-3 px-3 shadow-md md:mx-0 md:w-full md:rounded-md md:border md:px-6">
      <h2 className="border-b border-gray-200 pb-1 text-lg font-medium">About Campaign</h2>
      <SanitizedHTML className="prose tracking-tight" html={about_campaign} />
    </div>
  );
}

type LayoutProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export function Layout({ fundraisingCampaign }: LayoutProps) {
  const {
    id,
    name,
    target_amount,
    total_raised_amount,
    donor_count,
    about_campaign,
    categories,
    image_url,
    start_datetime,
    end_datetime,
    organization,
  } = fundraisingCampaign;

  return (
    <>
      <div className="relative mx-auto min-h-screen w-full max-w-screen-xl py-8">
        <div className="mx-4 md:mx-8 lg:mx-16 flex flex-col gap-6">
          <div className="grid grid-flow-row grid-cols-1 justify-center gap-y-4 gap-x-8 md:grid-cols-3 lg:gap-x-12">
            <div className="flex flex-col gap-6 md:col-span-2">
              <h1 className="break-words text-center text-2xl font-bold md:text-left lg:text-3xl">{name}</h1>
              <Gallery name={name} image_url={image_url} />
              <AboutCampaignCard about_campaign={about_campaign} />
            </div>
            <div className="flex flex-col gap-6 md:col-span-1">
              <TotalRaisedAmountCard
                target_amount={target_amount}
                total_raised_amount={total_raised_amount}
                donor_count={donor_count}
              />
              <DonationButton fundraisingCampaignId={id} organization={organization} />
              <DateAndTimeCard start_datetime={start_datetime} end_datetime={end_datetime} />
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
