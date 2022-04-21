import { Logo } from '@components/icons/logo';
import { Popover, Transition } from '@headlessui/react';
import { GiftIcon, HeartIcon, MenuIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import { ChevronRightIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

type NavItemProps = {
  href: string;
  children: React.ReactNode;
};

function NavItem({ href, children }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <Link href={href}>
      <a
        className={cn(
          isActive &&
            'text-pink-600 after:absolute after:h-full after:w-full after:mt-6 after:border-pink-600 after:border-b-2',
          'relative flex items-center justify-center p-2 text-base font-medium text-gray-90 hover:text-pink-600'
        )}>
        {children}
      </a>
    </Link>
  );
}

function LogoTextLink() {
  return (
    <Link href="/">
      <a className="flex items-center p-2">
        <Logo className="mr-3" width={36} height={36} />
        <span className="inline-block text-xl font-semibold whitespace-nowrap sm:text-lg">MyHearty</span>
      </a>
    </Link>
  );
}

function LoginLink() {
  return (
    <Link href="/login">
      <a className="inline-flex items-center justify-center px-3 py-2 text-base font-medium text-gray-900 whitespace-nowrap hover:text-pink-600">
        Log In
      </a>
    </Link>
  );
}

function SignupLink() {
  return (
    <Link href="/signup">
      <a className="inline-flex items-center justify-center px-3 py-2 text-base font-medium text-white bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-600 group whitespace-nowrap">
        <span className="group-hover:transition group-hover:-translate-x-0.5">Sign Up</span>
        <ChevronRightIcon className="w-6 h-6 group-hover:transition group-hover:translate-x-1" />
      </a>
    </Link>
  );
}

type MobileNavItemProps = {
  href: string;
  name: string;
  icon: JSX.Element;
};

function MobileNavItem({ href, icon, name }: MobileNavItemProps) {
  return (
    <Link href={href}>
      <a className="flex items-center p-3 -m-3 rounded-md hover:bg-pink-50" key={name}>
        <span className="flex-shrink-0 w-6 h-6 text-pink-600">{icon}</span>
        <span className="ml-3 text-base font-medium text-gray-900">{name}</span>
      </a>
    </Link>
  );
}

function MobileSignupLink() {
  return (
    <Link href="/signup">
      <a className="flex items-center justify-center w-full px-3 py-2 text-base font-medium text-white bg-pink-500 border border-transparent rounded-md shadow-sm hover:bg-pink-600">
        Sign Up
      </a>
    </Link>
  );
}

function MobileLoginLink() {
  return (
    <Link href="/login">
      <a className="flex items-center justify-center w-full px-3 py-2 text-base font-medium text-pink-600 hover:text-pink-400">
        Log In
      </a>
    </Link>
  );
}

function MobileMenu() {
  return (
    <Transition
      as={Fragment}
      enter="duration-200 ease-out"
      enterFrom="opacity-0 scale-95"
      enterTo="opacity-100 scale-100"
      leave="duration-100 ease-in"
      leaveFrom="opacity-100 scale-100"
      leaveTo="opacity-0 scale-95">
      <Popover.Panel
        focus
        className="absolute inset-x-0 top-0 p-2 transition origin-top-right transform md:hidden">
        <div className="bg-white divide-y-2 rounded-lg shadow-lg ring-1 ring-black ring-opacity-5 divide-gray-50">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Logo width={36} height={36} />
              <div className="-mr-3">
                <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <XIcon className="w-6 h-6" />
                </Popover.Button>
              </div>
            </div>
            <div className="px-2 mt-6">
              <nav className="grid gap-y-8">
                <MobileNavItem href={'/campaigns'} name="Donate Today" icon={<GiftIcon />} />
                <MobileNavItem href={'/volunteer-events'} name="Be a Volunteer" icon={<UsersIcon />} />
                <MobileNavItem href={'/aids'} name="Receive Aids" icon={<HeartIcon />} />
              </nav>
            </div>
          </div>
          <div className="p-6 space-y-2">
            <MobileSignupLink />
            <MobileLoginLink />
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
}

export function Header() {
  return (
    <Popover as="nav" className="relative bg-white border-b-2 border-gray-100 shadow-sm">
      <div className="px-4 py-1 mx-auto max-w-8xl">
        <div className="flex items-center justify-start mx-auto md:space-x-5">
          <LogoTextLink />
          <div className="items-center hidden md:flex md:space-x-2">
            <NavItem href={'/campaigns'}>Donate Today</NavItem>
            <NavItem href={'/volunteer-events'}>Be a Volunteer</NavItem>
            <NavItem href={'/aids'}>Receive Aids</NavItem>
          </div>
          <div className="flex justify-end flex-1 w-0 md:hidden">
            <Popover.Button className="inline-flex items-center justify-center p-2 text-gray-400 bg-white rounded-md hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
              <MenuIcon className="w-6 h-6" />
            </Popover.Button>
          </div>
          <div className="items-center justify-end hidden lg:space-x-4 md:flex md:flex-1 md:w-0">
            <LoginLink />
            <SignupLink />
          </div>
        </div>
      </div>
      <MobileMenu />
    </Popover>
  );
}
