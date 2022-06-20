import { FundraisingCampaigns } from '@components/fundraising-campaigns';
import { AppLayout } from '@components/layouts';
import { useOrganization } from '@myhearty/hooks';
import { Loader } from '@myhearty/ui/loader';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function FundraisingCampaignsPage() {
  const { organization } = useOrganization();
  const router = useRouter();

  if (!organization) {
    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader text="Loading..." />
      </div>
    );
  }

  if (!organization.charity) {
    router.replace('/volunteer-events');

    return (
      <div className="flex h-full flex-col items-center justify-center">
        <Loader text="Redirecting..." />
      </div>
    );
  }

  return (
    <>
      <NextSeo title="Fundraising Campaigns" />
      <div className="px-4 py-2">
        <FundraisingCampaigns />
      </div>
    </>
  );
}

FundraisingCampaignsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
