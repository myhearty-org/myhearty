import { EditFundraisingCampaignForm } from '@components/fundraising-campaigns';
import { FundraisingCampaignLayout } from '@components/layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function EditFundraisingCampaignPage() {
  return <EditFundraisingCampaignForm />;
}

EditFundraisingCampaignPage.getLayout = (page: React.ReactElement) => (
  <FundraisingCampaignLayout>{page}</FundraisingCampaignLayout>
);

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['validation'])),
    },
  };
};
