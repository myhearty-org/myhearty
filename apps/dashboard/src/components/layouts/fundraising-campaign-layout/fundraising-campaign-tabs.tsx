import { Tabs } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

type FundraisingCampaignTab = {
  name: string;
  label: string;
};

const fundraisingCampaignTabs: FundraisingCampaignTab[] = [
  { name: 'edit', label: 'Fundraising Campaign' },
  { name: 'donations', label: 'Donations' },
];

export function FundraisingCampaignTabs() {
  const router = useRouter();
  const { slug } = router.query;

  const activeTabName = router.asPath.split('/')[3];
  const activeTabIndex = fundraisingCampaignTabs.findIndex(
    (fundraisingCampaignTab) => fundraisingCampaignTab.name === activeTabName
  );

  return (
    <nav>
      <div className="mb-2">
        <Tabs active={activeTabIndex}>
          {fundraisingCampaignTabs.map((fundraisingCampaignTab, i) => (
            <Tabs.Tab
              key={i}
              label={
                <Link href={`/campaigns/${slug}/${fundraisingCampaignTab.name}`}>
                  <a>{fundraisingCampaignTab.label}</a>
                </Link>
              }
            />
          ))}
        </Tabs>
      </div>
    </nav>
  );
}
