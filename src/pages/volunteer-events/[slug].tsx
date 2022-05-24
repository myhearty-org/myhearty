import { Layout } from '@components/volunteer-events';
import { VolunteerEvent } from '@lib/types';
import { getVolunteerEvent } from '@lib/volunteer-events';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';

type VolunteerEventPageProps = {
  volunteerEvent: VolunteerEvent;
};

export default function VolunteerEventPage({ volunteerEvent }: VolunteerEventPageProps) {
  return (
    <div className="grow">
      <NextSeo title={volunteerEvent.name} />
      <Layout volunteerEvent={volunteerEvent} />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ params, locale }) {
  try {
    const volunteerEvent = await getVolunteerEvent(params?.slug as string);

    if (!volunteerEvent.published) {
      return {
        notFound: true,
      };
    }

    return {
      props: {
        volunteerEvent,
        ...(await serverSideTranslations(locale!, ['validation'])),
      },
    };
  } catch (error) {
    return {
      notFound: true,
    };
  }
};
