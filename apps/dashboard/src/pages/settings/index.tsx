import { AppLayout } from '@components/layouts';
import { NextSeo } from 'next-seo';

export default function SettingsPage() {
  return (
    <>
      <NextSeo title="Settings" />
    </>
  );
}

SettingsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
