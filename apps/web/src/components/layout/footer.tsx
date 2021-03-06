import { Button } from '@mantine/core';
import { VerticalLogoText } from '@myhearty/ui/logos';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="relative border-t-2 border-gray-100 bg-white">
      <div className="max-w-8xl mx-auto px-4 pt-1 pb-4">
        <div className="flex flex-col items-center">
          <Link href="/">
            <a>
              <VerticalLogoText />
            </a>
          </Link>
          <p className="mt-2 text-base font-semibold ">{"Let's join us today!"}</p>
          <div className="mt-4">
            <Link href="/signup" passHref>
              <Button component="a" size="md">
                Sign Up Now
              </Button>
            </Link>
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
