import { VolunteerEventLayout } from '@components/layouts';
import { Edit } from '@components/volunteer-events';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { GetServerSideProps } from 'next/types';

export default function EditVolunteerEventPage() {
  return <Edit />;
}

EditVolunteerEventPage.getLayout = (page: React.ReactElement) => (
  <VolunteerEventLayout>{page}</VolunteerEventLayout>
);

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['validation'])),
    },
  };
};
