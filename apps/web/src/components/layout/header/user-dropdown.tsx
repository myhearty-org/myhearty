import { useAuth } from '@components/providers/auth-provider';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Divider, Menu } from '@mantine/core';
import { NextLink } from '@mantine/next';
import { Avatar } from '@myhearty/ui/avatar';
import { handleRequest } from '@myhearty/utils/api';

export function UserDropdown() {
  const auth = useAuth();

  async function logOut() {
    await auth.logOut();
    window.location.reload();
  }

  return (
    <Menu
      size={220}
      transition="pop-top-right"
      control={
        <button className="group flex cursor-pointer appearance-none items-center">
          <span className="relative mr-1 h-8 w-8">
            <Avatar src={auth.user.avatarUrl} alt="User avatar" />
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      }
      placement="end"
      position="bottom">
      <Menu.Item component={NextLink} href="/user/donations">
        Your donations
      </Menu.Item>
      <Menu.Item component={NextLink} href="/user/volunteer-applications">
        Your volunteer applications
      </Menu.Item>
      <Menu.Item component={NextLink} href="/user/aid-applications">
        Your aid applications
      </Menu.Item>
      <Divider />
      <Menu.Item component="a" onClick={() => handleRequest(logOut)}>
        Log out
      </Menu.Item>
    </Menu>
  );
}
