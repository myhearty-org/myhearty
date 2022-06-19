import { CharitableAids } from '@components/charitable-aids';
import { AppLayout } from '@components/layouts';
import { NextSeo } from 'next-seo';

export default function CharitableAidsPage() {
  return (
    <>
      <NextSeo title="Charitable Aids" />
      <div className="px-4 py-2">
        <CharitableAids />
      </div>
    </>
  );
}

CharitableAidsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
