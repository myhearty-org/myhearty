import { NavMenu } from './nav-menu';
import { StripeOnboardSection } from './stripe-onboard-section';
import { UserDropdown } from './user-dropdown';
import { Transition } from '@headlessui/react';
import { MenuIcon, XIcon } from '@heroicons/react/outline';
import { AppShell as AppShellComponent, Header, Navbar, ScrollArea } from '@mantine/core';
import { HorizontalLogoText } from '@myhearty/ui/logos';
import { Fragment } from 'react';
import { useToggle } from 'react-use';

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  const [isOpen, toggleIsOpen] = useToggle(false);

  return (
    <AppShellComponent
      fixed
      navbarOffsetBreakpoint={1024}
      navbar={
        <>
          <Transition
            as={Fragment}
            show={isOpen}
            enter="duration-300 ease-out origin-right"
            enterFrom="opacity-0 -translate-x-full"
            enterTo="opacity-100 translate-x-0"
            leave="duration-300 ease-in origin-left"
            leaveFrom="opacity-100 translate-x-0"
            leaveTo="opacity-0 -translate-x-full">
            <Navbar className="flex flex-col py-4 px-2 lg:hidden" width={{ base: 230 }}>
              <Navbar.Section className="-mr-3 grow" component={ScrollArea}>
                <NavMenu />
              </Navbar.Section>
              <Navbar.Section>
                <StripeOnboardSection />
              </Navbar.Section>
            </Navbar>
          </Transition>
          <Navbar className="hidden py-4 px-2 lg:flex lg:flex-col" width={{ base: 230 }}>
            <Navbar.Section className="-mr-3 grow" component={ScrollArea}>
              <NavMenu />
            </Navbar.Section>
            <Navbar.Section>
              <StripeOnboardSection />
            </Navbar.Section>
          </Navbar>
        </>
      }
      header={
        <Header className="p-4" height={48}>
          <div className="flex h-full items-center">
            <button
              className="inline-flex items-center justify-center rounded-md bg-white p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-500 lg:hidden"
              onClick={toggleIsOpen}>
              {isOpen ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
            </button>
            <HorizontalLogoText />
            <div className="flex flex-1 items-center justify-end">
              <UserDropdown />
            </div>
          </div>
        </Header>
      }>
      {children}
    </AppShellComponent>
  );
}
