import { Logo } from '@components/icons/logo';
import Link from 'next/link';

function LogoText() {
  return (
    <Link href="/">
      <a className="flex flex-col items-center gap-1 p-2">
        <Logo className="" width={60} height={60} />
        <span className="inline-block whitespace-nowrap text-xl font-semibold">MyHearty</span>
      </a>
    </Link>
  );
}

function SignupLink() {
  return (
    <Link href="/signup">
      <a className="flex w-full items-center justify-center rounded-md border border-transparent bg-pink-500 px-3 py-2 text-base font-medium text-white shadow-sm hover:bg-pink-600">
        Sign Up Now
      </a>
    </Link>
  );
}

export function Footer() {
  return (
    <footer className="relative border-t-2 border-gray-100 bg-white">
      <div className="max-w-8xl mx-auto px-4 pt-1 pb-4">
        <div className="flex flex-col items-center">
          <LogoText />
          <p className="mt-2 text-base font-semibold ">{"Let's join us today!"}</p>
          <div className="mt-4">
            <SignupLink />
          </div>
        </div>
        <div className="mt-4 flex flex-col items-center gap-1 sm:flex-row sm:justify-between">
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
