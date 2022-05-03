import { Button } from '@components/ui/button';
import { ProgressBar } from '@components/ui/progress-bar';
import { useHasMounted } from '@hooks/index';
import { calculate_percentage, count_days } from '@utils/common';
import pluralize from 'pluralize';

type CardHeaderProps = {
  target_amount: number;
  total_raised_amount: number;
  donor_count: number;
  end_datetime: number;
  image_url: string;
};

function CardHeader({
  target_amount,
  total_raised_amount,
  donor_count,
  end_datetime,
  image_url,
}: CardHeaderProps) {
  const current_datetime = Math.floor(Date.now() / 1000);
  const day_count = count_days(current_datetime, end_datetime);
  const amount_percentage = calculate_percentage(total_raised_amount, target_amount);

  return (
    <div className="relative h-0 w-full overflow-hidden rounded-t-md pt-[75%]">
      <div
        className="absolute top-0 left-0 h-full w-full bg-cover bg-center after:absolute after:h-full after:w-full after:bg-gradient-to-t after:from-gray-700 after:opacity-30"
        style={{ backgroundImage: `url(${image_url})` }}
      />
      <div className="absolute bottom-0 z-10 w-full px-4 pb-2 font-medium text-white">
        <h2 className="text-2xl">RM{total_raised_amount.toLocaleString()}</h2>
        <p className="text-base">from {pluralize('donor', donor_count, true)}</p>
        <ProgressBar
          className="my-1"
          color="bg-gradient-to-r from-pink-300 to-pink-500"
          percentage={amount_percentage}
        />
        <div className="flex justify-between text-sm">
          <span className="">{pluralize('day', day_count, true)} left</span>
          <span className="">
            {amount_percentage}% of RM{target_amount.toLocaleString()}
          </span>
        </div>
      </div>
    </div>
  );
}

type CardBodyProps = {
  name: string;
  organization: string;
  about_campaign: string;
};

function CardBody({ name, organization, about_campaign }: CardBodyProps) {
  return (
    <div className="flex h-auto flex-1 flex-col justify-start gap-px p-3">
      <h2 className="break-words text-lg font-medium line-clamp-2">{name}</h2>
      <p className="text-sm text-gray-500 line-clamp-1">By {organization}</p>
      <p className="text-sm">{about_campaign}</p>
      <div className="mt-3 flex flex-1 flex-col items-center justify-end">
        <Button type="button" size="sm">
          Donate
        </Button>
      </div>
    </div>
  );
}

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
        target_amount={hit.target_amount}
        total_raised_amount={hit.total_raised_amount}
        donor_count={hit.donor_count}
        end_datetime={hit.end_datetime}
        image_url={hit.image_url}
      />
      <CardBody name={hit.name} organization={hit.organization} about_campaign={hit.about_campaign} />
    </a>
  );
}
