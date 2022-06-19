import { AppLayout } from '@components/layouts';
import { VolunteerEvents } from '@components/volunteer-events';
import { NextSeo } from 'next-seo';

export default function VolunteerEventsPage() {
  return (
    <>
      <NextSeo title="Volunteer Events" />
      <div className="px-4 py-2">
        <VolunteerEvents />
      </div>
    </>
  );
}

VolunteerEventsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
