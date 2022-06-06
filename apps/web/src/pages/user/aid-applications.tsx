import { AuthRequired } from '@components/helpers';
import { UserLayout } from '@components/user';
import { CharitableAidApplicationsTable } from '@components/user';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function CharitableAidApplicationsPage() {
  return (
    <AuthRequired>
      <UserLayout title="Your Aid Applications">
        <CharitableAidApplicationsTable />
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
