import { GetServerSideProps } from 'next/types';

export default function SettingsPage() {
  return;
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    redirect: {
      destination: '/settings/members',
      permanent: false,
    },
  };
};
