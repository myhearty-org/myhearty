import { AppLayout } from '@components/layouts';
import { useOrganization } from '@components/providers';
import { Loader } from '@myhearty/ui/loader';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

export default function FundraisingCampaignsPage() {
  const organization = useOrganization();
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
  }

  return (
    <>
      <NextSeo title="Fundraising Campaigns" />
    </>
  );
}

FundraisingCampaignsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
