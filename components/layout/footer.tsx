import { Logo } from '@components/icons/logo';
import Link from 'next/link';

function LogoText() {
  return (
    <Link href="/">
      <a className="flex flex-col items-center gap-1 p-2">
        <Logo className="" width={60} height={60} />
        <span className="inline-block text-xl font-semibold whitespace-nowrap">MyHearty</span>
      </a>
    </Link>
  );
}

function SignupLink() {
  return (
    <Link href="/signup">
      <a className="flex items-center justify-center w-full px-3 py-2 text-base font-medium text-white bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-600">
        Sign Up Now
      </a>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative bg-white border-t-2 border-gray-100">
      <div className="px-4 pt-1 pb-4 mx-auto max-w-8xl">
        <div className="flex flex-col items-center">
          <LogoText />
          <p className="mt-2 text-base font-semibold ">{"Let's join us today!"}</p>
          <div className="mt-4">
            <SignupLink />
          </div>
        </div>
        <div className="flex flex-col items-center gap-1 mt-4 sm:flex-row sm:justify-between">
          <p className="text-sm text-gray-500">© Copyright 2022. All Rights Reserved.</p>
          <div className="flex">
            <a href="#" className="mx-2 text-sm text-gray-500">
              {' Privacy '}
            </a>
            <a href="#" className="mx-2 text-sm text-gray-500">
              {' Cookies '}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
