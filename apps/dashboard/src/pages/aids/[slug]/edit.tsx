import { EditCharitableAidForm } from '@components/charitable-aids';
import { CharitableAidLayout } from '@components/layouts';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function EditCharitableAidPage() {
  return <EditCharitableAidForm />;
}

EditCharitableAidPage.getLayout = (page: React.ReactElement) => (
  <CharitableAidLayout>{page}</CharitableAidLayout>
);

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['validation'])),
    },
  };
};
