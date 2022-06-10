import { AppLayout } from '@components/layouts';
import { NextSeo } from 'next-seo';

export default function CharitableAidsPage() {
  return (
    <>
      <NextSeo title="Charitable Aids" />
    </>
  );
}

CharitableAidsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
