import { GetServerSideProps } from 'next/types';

export default function Home() {
  return;
}

export const getServerSideProps: GetServerSideProps = async function () {
  return {
    redirect: {
      destination: '/campaigns',
      permanent: false,
    },
  };
};
