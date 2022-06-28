import { VolunteerEventLayout } from '@components/layouts';
import { VolunteerApplications } from '@components/volunteer-events';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function VolunteerApplicationsPage() {
  return <VolunteerApplications />;
}

VolunteerApplicationsPage.getLayout = (page: React.ReactElement) => (
  <VolunteerEventLayout>{page}</VolunteerEventLayout>
);

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
