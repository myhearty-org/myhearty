import { AppLayout } from '../app-layout';
import { VolunteerEventTabs } from './volunteer-event-tabs';
import { NextSeo } from 'next-seo';

type VolunteerEventLayoutProps = {
  children: React.ReactNode;
};

export function VolunteerEventLayout({ children }: VolunteerEventLayoutProps) {
  return (
    <AppLayout>
      <NextSeo title="Volunteer Event" />
      <VolunteerEventTabs />
      <div className="px-4 py-2">{children}</div>
    </AppLayout>
  );
}
