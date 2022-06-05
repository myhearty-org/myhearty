import { UserDropdown } from './user-dropdown';
import { Popover, Transition } from '@headlessui/react';
import { GiftIcon, HeartIcon, MenuIcon, UserIcon, UsersIcon, XIcon } from '@heroicons/react/outline';
import { useAuth } from '@hooks';
import { Button } from '@mantine/core';
import { useHasMounted } from '@myhearty/hooks';
import { Logo } from '@myhearty/ui/icons';
import { handleRequest } from '@myhearty/utils/api';
import cn from 'classnames';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { Fragment } from 'react';

export function Header() {
  const auth = useAuth();
  const hasMounted = useHasMounted();

  return (
    <Popover as="nav" className="relative border-b border-gray-100 bg-white shadow-sm">
      <div className="max-w-8xl mx-auto px-4 py-1">
        <div className="mx-auto flex items-center justify-start md:space-x-5">
          <LogoTextLink />
          <div className="hidden items-center md:flex md:space-x-2">
            <NavItem href={'/campaigns'}>Donate Now</NavItem>
            <NavItem href={'/volunteer-events'}>Volunteer Today</NavItem>
            <NavItem href={'/aids'}>Receive Aids</NavItem>
          </div>
          <div className="flex w-0 flex-1 justify-end md:hidden">
            <Popover.Button className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-pink-500">
              <MenuIcon className="h-6 w-6" />
            </Popover.Button>
          </div>
          <div className="hidden items-center justify-end md:flex md:w-0 md:flex-1 lg:space-x-4">
            {hasMounted && !auth.isAuthenticated && (
              <>
                <Link href="/login" passHref>
                  <Button component="a" variant="subtle" size="md">
                    Log In
                  </Button>
                </Link>
                <Link href="/signup" passHref>
                  <Button component="a" size="md">
                    Sign Up
                  </Button>
                </Link>
              </>
            )}
            {hasMounted && auth.isAuthenticated && <UserDropdown />}
          </div>
        </div>
      </div>
      <MobileMenu />
    </Popover>
  );
}

function LogoTextLink() {
  return (
    <Link href="/">
      <a className="flex items-center p-2">
        <Logo className="mr-3" width={36} height={36} />
        <span className="inline-block whitespace-nowrap text-xl font-semibold sm:text-lg">MyHearty</span>
      </a>
    </Link>
  );
}

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
          'relative flex items-center justify-center p-2 text-base font-medium hover:text-pink-600',
          isActive
            ? 'text-pink-600 after:absolute after:mt-5 after:h-full after:w-full after:border-b-2 after:border-pink-600'
            : 'text-gray-900'
        )}>
        {children}
      </a>
    </Link>
  );
}

function MobileMenu() {
  const auth = useAuth();

  async function logOut() {
    await auth.logOut();
    window.location.reload();
  }

  const hasMounted = useHasMounted();

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
        className="absolute inset-x-0 top-0 z-50 origin-top-right transform p-2 transition md:hidden">
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
                <MobileNavItem href={'/campaigns'} name="Donate Now" icon={GiftIcon} />
                <MobileNavItem href={'/volunteer-events'} name="Volunteer With Us" icon={UsersIcon} />
                <MobileNavItem href={'/aids'} name="Receive Aids" icon={HeartIcon} />
                {hasMounted && auth.isAuthenticated && (
                  <MobileNavItem href={'/user'} name="Your Profile" icon={UserIcon} />
                )}
              </nav>
            </div>
          </div>
          <div className="space-y-2 p-6">
            {hasMounted && !auth.isAuthenticated && (
              <>
                <Popover.Button as={'div'}>
                  <Link href="/signup" passHref>
                    <Button component="a" size="md" fullWidth>
                      Sign Up
                    </Button>
                  </Link>
                </Popover.Button>
                <Popover.Button as={'div'}>
                  <Link href="/login" passHref>
                    <Button component="a" variant="subtle" size="md" fullWidth>
                      Log In
                    </Button>
                  </Link>
                </Popover.Button>
              </>
            )}
            {hasMounted && auth.isAuthenticated && (
              <Popover.Button as={'div'}>
                <Button
                  size="md"
                  fullWidth
                  onClick={() => handleRequest(logOut)}>
                  Log Out
                </Button>
              </Popover.Button>
            )}
          </div>
        </div>
      </Popover.Panel>
    </Transition>
  );
}

type MobileNavItemProps = {
  href: string;
  name: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
};

function MobileNavItem({ href, name, icon: Icon }: MobileNavItemProps) {
  return (
    <Popover.Button as={'div'}>
      <Link href={href}>
        <a className="-m-3 flex items-center rounded-md p-3 hover:bg-pink-50" key={name}>
          <Icon className="h-6 w-6 flex-shrink-0 text-pink-600" />
          <span className="ml-3 text-base font-medium text-gray-900">{name}</span>
        </a>
      </Link>
    </Popover.Button>
  );
}
