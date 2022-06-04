import { UserLayout } from '@components/user';
import { VolunteerApplicationsTable } from '@components/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function VolunteerApplicationsPage() {
  return (
    <UserLayout title="Your Volunteer Applications">
      <VolunteerApplicationsTable />
    </UserLayout>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
