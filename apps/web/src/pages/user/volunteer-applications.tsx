import { AuthRequired } from '@components/helpers';
import { UserLayout } from '@components/user';
import { VolunteerApplicationsTable } from '@components/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function VolunteerApplicationsPage() {
  return (
    <AuthRequired>
      <UserLayout title="Your Volunteer Applications">
        <VolunteerApplicationsTable />
      </UserLayout>
    </AuthRequired>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['common'])),
    },
  };
};
