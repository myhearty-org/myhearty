import { useAuth } from '@components/providers';
import { CogIcon, GiftIcon, HeartIcon, KeyIcon, UsersIcon } from '@heroicons/react/outline';
import { Skeleton } from '@mantine/core';
import { useOrganization } from '@myhearty/hooks';
import { Menu, MenuItem } from '@myhearty/ui/menu';
import { useRouter } from 'next/router';

export function NavMenu() {
  const auth = useAuth();
  const { organization } = useOrganization();

  if (!organization) {
    return (
      <div className="flex w-full flex-col gap-2 p-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-8 rounded" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col p-2">
      <div className="grow">
        <Menu>
          {organization.charity && (
            <NavItem href="/campaigns" icon={GiftIcon}>
              Fundraising Campaigns
            </NavItem>
          )}
          <NavItem href="/volunteer-events" icon={UsersIcon}>
            Volunteer Events
          </NavItem>
          <NavItem href="/aids" icon={HeartIcon}>
            Charitable Aids
          </NavItem>
          <NavItem href="/settings" icon={CogIcon}>
            Settings
          </NavItem>
          {auth.member.admin && (
            <NavItem href="/api-keys" icon={KeyIcon}>
              API Keys
            </NavItem>
          )}
        </Menu>
      </div>
    </div>
  );
}

type NavItemProps = {
  href: string;
  icon: React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
  children: React.ReactNode;
};

function NavItem({ href, icon, children }: NavItemProps) {
  const router = useRouter();
  const isActive = router.asPath.split('/')[1] === href.slice(1);

  return (
    <MenuItem href={href} icon={icon} isActive={isActive} backgroundColor="bg-gray-100">
      {children}
    </MenuItem>
  );
}
