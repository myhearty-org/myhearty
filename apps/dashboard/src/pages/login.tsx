import { LoginForm } from '@components/auth';
import { NoAuth } from '@components/helpers';
import { VerticalLogoText } from '@myhearty/ui/logos';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <NextSeo title="Log in to Dashboard" />
      <NoAuth>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-6 sm:max-w-md">
            <div className="flex flex-col gap-2">
              <VerticalLogoText />
              <h2 className="text-center text-2xl font-bold text-gray-900">Log in to your dashboard</h2>
            </div>
            <div className="rounded-md border border-gray-200 bg-white py-8 px-4 shadow-md sm:px-10">
              <LoginForm />
            </div>
            <SignupLink />
          </div>
        </div>
      </NoAuth>
    </>
  );
}

function SignupLink() {
  return (
    <Link href="/signup" passHref>
      <p className="text-center text-sm text-gray-600">
        {"Don't have an account? "}
        <a className="font-medium text-pink-600 hover:text-pink-400">Sign up here.</a>
      </p>
    </Link>
  );
}
