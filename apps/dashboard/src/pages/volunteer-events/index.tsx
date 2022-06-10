import { AppLayout } from '@components/layouts';
import { NextSeo } from 'next-seo';

export default function VolunteerEventsPage() {
  return (
    <>
      <NextSeo title="Volunteer Events" />
    </>
  );
}

VolunteerEventsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
