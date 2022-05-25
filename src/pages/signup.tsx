import { SignupForm } from '@components/auth';
import { NoAuth } from '@components/helpers';
import Link from 'next/link';

export default function SignupPage() {
  return (
    <NoAuth>
      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="w-full max-w-sm space-y-6 sm:max-w-md">
          <h2 className="mt-6 text-center text-2xl font-bold text-gray-900">
            Join us now.
            <br />
            Create a new account
          </h2>
          <SignupForm />
          <LoginLink />
        </div>
      </div>
    </NoAuth>
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
