import { AppLayout } from '../app-layout';
import { FundraisingCampaignTabs } from './fundraising-campaign-tabs';
import { NextSeo } from 'next-seo';

type FundraisingCampaignLayoutProps = {
  children: React.ReactNode;
};

export function FundraisingCampaignLayout({ children }: FundraisingCampaignLayoutProps) {
  return (
    <AppLayout>
      <>
        <NextSeo title="Fundraising Campaign" />
        <FundraisingCampaignTabs />
        <div className="px-4 py-2">{children}</div>
      </>
    </AppLayout>
  );
}
