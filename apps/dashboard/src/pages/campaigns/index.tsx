import { FundraisingCampaigns } from '@components/fundraising-campaigns';
import { AppLayout } from '@components/layouts';
import { useOrganization } from '@myhearty/hooks';
import { Alert } from '@myhearty/ui/alert';
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
        {organization.stripeOnboarded ? (
          <FundraisingCampaigns />
        ) : (
          <div className="flex justify-center">
            <Alert
              severity="warning"
              title="You need to create a Stripe account to start collecting donations."
              message="Please note that only organization admin can create a Stripe account."
            />
          </div>
        )}
      </div>
    </>
  );
}

FundraisingCampaignsPage.getLayout = (page: React.ReactElement) => <AppLayout>{page}</AppLayout>;
