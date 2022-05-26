import { LoginForm } from '@components/auth';
import { NoAuth } from '@components/helpers';
import { NextSeo } from 'next-seo';
import Link from 'next/link';

export default function LoginPage() {
  return (
    <>
      <NextSeo title="Log in to MyHearty" />
      <NoAuth>
        <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="w-full max-w-sm space-y-6 sm:max-w-md">
            <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
              Welcome.
              <br />
              Log in to your account
            </h2>
            <LoginForm />
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
