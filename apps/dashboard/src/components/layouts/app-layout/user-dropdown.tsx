import { useAuth } from '@components/providers/auth-provider';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { Menu } from '@mantine/core';
import { Avatar } from '@myhearty/ui/avatar';
import { handleRequest } from '@myhearty/utils/api';
import { useRouter } from 'next/router';

export function UserDropdown() {
  const auth = useAuth();
  const router = useRouter();

  async function logOut() {
    await auth.logOut();
    router.push('/login');
  }

  return (
    <Menu
      size={100}
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
      <Menu.Item component="a" onClick={() => handleRequest(logOut)}>
        Log out
      </Menu.Item>
    </Menu>
  );
}
