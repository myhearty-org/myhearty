import { GiftIcon, HeartIcon, UsersIcon } from '@heroicons/react/outline';
import { Menu, MenuItem } from '@myhearty/ui/menu';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';

type UserLayoutProps = {
  title: string;
  children: React.ReactNode;
};

export function UserLayout({ title, children }: UserLayoutProps) {
  return (
    <>
      <NextSeo title={title} />
      <div className="mx-auto flex h-full w-full max-w-[1408px] flex-col items-center gap-4 py-8 px-6 md:flex-row md:items-start">
        <UserMenu />
        <main className="flex w-full flex-1 flex-col">{children}</main>
      </div>
    </>
  );
}

function UserMenu() {
  return (
    <div className="flex h-full w-full flex-col md:w-60">
      <div className="grow">
        <Menu>
          <UserMenuItem href="/user/donations" icon={GiftIcon}>
            Donations
          </UserMenuItem>
          <UserMenuItem href="/user/volunteer-applications" icon={UsersIcon}>
            Volunteer Applications
          </UserMenuItem>
          <UserMenuItem href="/user/aid-applications" icon={HeartIcon}>
            Charitable Aid Applications
          </UserMenuItem>
        </Menu>
      </div>
    </div>
  );
}

type UserMenuItemProps = {
  href: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
};

function UserMenuItem({ href, icon, children }: UserMenuItemProps) {
  const router = useRouter();
  const isActive = router.asPath === href;

  return (
    <MenuItem href={href} icon={icon} isActive={isActive}>
      {children}
    </MenuItem>
  );
}
