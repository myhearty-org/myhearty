import { Layout } from '@components/fundraising-campaigns';
import { getFundraisingCampaign } from '@lib/fundraising-campaigns';
import { FundraisingCampaign } from '@lib/types';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';

type FundraisingCampaignPageProps = {
  fundraisingCampaign: FundraisingCampaign;
};

export default function FundraisingCampaignPage({ fundraisingCampaign }: FundraisingCampaignPageProps) {
  return (
    <div className="grow">
      <NextSeo title={fundraisingCampaign.name} />
      <Layout fundraisingCampaign={fundraisingCampaign} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ params }) {
  try {
    const { data } = await getFundraisingCampaign(params?.slug as string);
    const fundraisingCampaign: FundraisingCampaign = { ...data };

    if (!fundraisingCampaign.published) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        fundraisingCampaign,
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
