import { useAuth } from '@components/providers';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Divider, Menu } from '@mantine/core';
import { useOrganization } from '@myhearty/hooks';
import { Avatar } from '@myhearty/ui/avatar';
import { handleRequest } from '@myhearty/utils/api';
import { useRouter } from 'next/router';

export function UserDropdown() {
  const auth = useAuth();
  const { mutate } = useOrganization();
  const router = useRouter();

  async function logOut() {
    await auth.logOut();
    mutate(null!);
    router.push('/login');
  }

  return (
    <Menu
      size={220}
      transition="pop-top-right"
      control={
        <button className="group flex cursor-pointer appearance-none items-center">
          <span className="relative mr-1 h-8 w-8">
            <Avatar src="https://www.gravatar.com/avatar/?d=mp" alt="User avatar" />
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      }
      placement="end"
      position="bottom">
      <Menu.Item className="pointer-events-none">
        Logged in as <br />
        <strong className="truncate font-medium leading-normal">{auth.member.email}</strong>
      </Menu.Item>
      <Divider />
      <Menu.Item component="a" onClick={() => handleRequest(logOut)}>
        Log out
      </Menu.Item>
    </Menu>
  );
}
