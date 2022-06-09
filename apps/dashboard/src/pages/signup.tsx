import { SignupForm } from '@components/auth';
import { NoAuth } from '@components/helpers';
import { VerticalLogoText } from '@myhearty/ui/logos';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { NextSeo } from 'next-seo';
import Link from 'next/link';
import { GetServerSideProps } from 'next/types';

export default function SignupPage() {
  return (
    <>
      <NextSeo title="Join MyHearty" />
      <NoAuth>
        <div className="px-4 sm:px-6 lg:grid lg:grid-cols-3">
          <div className="flex w-full flex-col justify-center gap-6 lg:sticky lg:inset-y-0 lg:col-span-1 lg:h-screen">
            <div className="flex flex-col gap-2">
              <VerticalLogoText />
              <h2 className="text-center text-2xl font-bold text-gray-900">Create an organization account</h2>
            </div>
            <LoginLink />
          </div>
          <div className="p-4 lg:col-span-2">
            <SignupForm />
          </div>
        </div>
      </NoAuth>
    </>
  );
}

function LoginLink() {
  return (
    <Link href="/login" passHref>
      <p className="text-center text-sm text-gray-600">
        {'Already have an account? '}
        <a className="font-medium text-pink-600 hover:text-pink-400">Log in here.</a>
      </p>
    </Link>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ locale }) {
  return {
    props: {
      ...(await serverSideTranslations(locale!, ['validation'])),
    },
  };
};
