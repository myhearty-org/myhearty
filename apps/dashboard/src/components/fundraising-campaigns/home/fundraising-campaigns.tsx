import { FundraisingCampaignsList } from './fundraising-campaigns-list';
import { Button } from '@mantine/core';
import Link from 'next/link';

export function FundraisingCampaigns() {
  return (
    <div>
      <h4 className="mb-3 text-lg font-medium">Fundraising Campaigns</h4>
      <div className="mb-4 flex items-center">
        <Link href="/campaigns/new" passHref>
          <Button component="a" size="xs">
            New fundraising campaign
          </Button>
        </Link>
      </div>
      <FundraisingCampaignsList />
    </div>
  );
}
