import { Logo } from '@components/icons/logo';
import { Button } from '@components/ui/button';
import { Popover, Transition } from '@headlessui/react';
import { GiftIcon, HeartIcon, MenuIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

function LogoTextLink() {
  return (
    <Link href="/">
      <a className="flex items-center p-2">
        <Logo className="mr-3" width={36} height={36} />
        <span className="inline-block whitespace-nowrap text-xl font-semibold sm:text-lg">MyHearty</span>
      </a>
    </Link>
  );
}3

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
            'text-pink-600 after:absolute after:mt-6 after:h-full after:w-full after:border-b-2 after:border-pink-600',
          'relative flex items-center justify-center p-2 text-base font-medium text-gray-900 hover:text-pink-600'
        )}>
        {children}
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
    <Popover.Button as={'div'}>
      <Link href={href}>
        <a className="-m-3 flex items-center rounded-md p-3 hover:bg-pink-50" key={name}>
          <span className="h-6 w-6 flex-shrink-0 text-pink-600">{icon}</span>
          <span className="ml-3 text-base font-medium text-gray-900">{name}</span>
        </a>
      </Link>
    </Popover.Button>
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
        className="absolute inset-x-0 top-0 z-10 origin-top-right transform p-2 transition md:hidden">
        <div className="divide-y-2 divide-gray-50 rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="p-5">
            <div className="flex items-center justify-between">
              <Logo width={36} height={36} />
              <div className="-mr-3">
                <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
                  <XIcon className="h-6 w-6" />
                </Popover.Button>
              </div>
            </div>
            <div className="mt-6 px-2">
              <nav className="grid gap-y-8">
                <MobileNavItem href={'/campaigns'} name="Donate Today" icon={<GiftIcon />} />
                <MobileNavItem href={'/volunteer-events'} name="Be a Volunteer" icon={<UsersIcon />} />
                <MobileNavItem href={'/aids'} name="Receive Aids" icon={<HeartIcon />} />
              </nav>
            </div>
          </div>
          <div className="space-y-2 p-6">
            <Popover.Button as={'div'}>
              <Button className="w-full justify-center" href="/signup" type="button" size="lg">
                Sign Up
              </Button>
            </Popover.Button>
            <Popover.Button as={'div'}>
              <Button className="w-full justify-center" href="/login" type="button" color="minimal" size="lg">
                Log In
              </Button>
            </Popover.Button>
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
}

export function Header() {
  return (
    <Popover as="nav" className="relative border-b-2 border-gray-100 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 py-1">
        <div className="mx-auto flex items-center justify-start md:space-x-5">
          <LogoTextLink />
          <div className="hidden items-center md:flex md:space-x-2">
            <NavItem href={'/campaigns'}>Donate Today</NavItem>
            <NavItem href={'/volunteer-events'}>Be a Volunteer</NavItem>
            <NavItem href={'/aids'}>Receive Aids</NavItem>
          </div>
          <div className="flex w-0 flex-1 justify-end md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
              <MenuIcon className="h-6 w-6" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex md:w-0 md:flex-1 lg:space-x-4">
            <Button href="/login" type="button" color="minimal" size="lg">
              Log In
            </Button>
            <Button href="/signup" type="button" size="lg">
              Sign Up
            </Button>
          </div>
        </div>
      </div>
      <MobileMenu />
    </Popover>
  );
}
