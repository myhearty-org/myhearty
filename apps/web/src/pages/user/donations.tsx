import { AuthRequired } from '@components/helpers';
import { UserLayout } from '@components/user';
import { DonationsTable } from '@components/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function DonationsPage() {
  return (
    <AuthRequired>
      <UserLayout title="Your Donations">
        <DonationsTable />
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
