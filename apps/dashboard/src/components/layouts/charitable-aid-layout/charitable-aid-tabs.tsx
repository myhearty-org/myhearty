import { Tabs } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

type CharitableAidTab = {
  name: string;
  label: string;
};

const charitableAidTabs: CharitableAidTab[] = [
  { name: 'edit', label: 'Charitable Aid' },
  { name: 'aid-applications', label: 'Applications' },
];

export function CharitableAidTabs() {
  const router = useRouter();
  const { slug } = router.query;

  const activeTabName = router.asPath.split('/')[3];
  const activeTabIndex = charitableAidTabs.findIndex(
    (charitableAidTab) => charitableAidTab.name === activeTabName
  );

  return (
    <nav>
      <div className="mb-2">
        <Tabs active={activeTabIndex}>
          {charitableAidTabs.map((charitableAidTab, i) => (
            <Tabs.Tab
              key={i}
              label={
                <Link href={`/aids/${slug}/${charitableAidTab.name}`}>
                  <a>{charitableAidTab.label}</a>
                </Link>
              }
            />
          ))}
        </Tabs>
      </div>
    </nav>
  );
}
