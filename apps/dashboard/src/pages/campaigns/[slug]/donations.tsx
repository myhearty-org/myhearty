import { Donations } from '@components/fundraising-campaigns';
import { FundraisingCampaignLayout } from '@components/layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function DonationsPage() {
  return <Donations />;
}

DonationsPage.getLayout = (page: React.ReactElement) => (
  <FundraisingCampaignLayout>{page}</FundraisingCampaignLayout>
);

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
