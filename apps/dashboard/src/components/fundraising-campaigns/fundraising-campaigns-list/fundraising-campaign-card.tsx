import { FundraisingCampaign } from '@myhearty/lib/types';
import { CardButton } from '@myhearty/ui/card-button';

type FundraisingCampaignCardProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export function FundraisingCampaignCard({ fundraisingCampaign }: FundraisingCampaignCardProps) {
  const { name, slug } = fundraisingCampaign;

  return (
    <li className="col-span-1">
      <CardButton
        linkHref={`/campaigns/${slug}/edit`}
        title={
          <div className="flex w-full justify-between gap-1">
            <span className="line-clamp-2 flex-shrink">{name}</span>
          </div>
        }
      />
    </li>
  );
}
