import { Tabs } from '@mantine/core';
import Link from 'next/link';
import { useRouter } from 'next/router';

type VolunteerEventTab = {
  name: string;
  label: string;
};

const volunteerEventTabs: VolunteerEventTab[] = [
  { name: 'edit', label: 'Volunteer Event' },
  { name: 'applications', label: 'Applications' },
];

export function VolunteerEventTabs() {
  const router = useRouter();
  const { slug } = router.query;

  const activeTabName = router.asPath.split('/')[3];
  const activeTabIndex = volunteerEventTabs.findIndex(
    (volunteerEventTab) => volunteerEventTab.name === activeTabName
  );

  return (
    <nav>
      <div className="mb-2">
        <Tabs active={activeTabIndex}>
          {volunteerEventTabs.map((volunteerEventTab, i) => (
            <Tabs.Tab
              key={i}
              label={
                <Link href={`/volunteer-events/${slug}/${volunteerEventTab.name}`}>
                  <a>{volunteerEventTab.label}</a>
                </Link>
              }
            />
          ))}
        </Tabs>
      </div>
    </nav>
  );
}
