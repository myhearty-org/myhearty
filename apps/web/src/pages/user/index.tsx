import { GetServerSideProps } from 'next/types';

export default function UserPage() {
  return;
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    redirect: {
      destination: '/user/donations',
      permanent: false,
    },
  };
};
