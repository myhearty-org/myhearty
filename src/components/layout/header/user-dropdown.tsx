import { Avatar } from '@components/ui/avatar';
import {
  Dropdown,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@components/ui/dropdown';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useAuth } from '@hooks/index';
import { handleRequest } from '@utils/api';
import Link from 'next/link';

type DropdownItemProps = {
  name: string;
  href: string;
};

function DropdownItem({ name, href }: DropdownItemProps) {
  // Next's Link does not pass ref to its children properly, causing the
  // dropdown menu to not close after the menu item was clicked. Hence, we have
  // to dispatch an 'Escape' keydown event to close the dropdown menu manually.
  function onClick() {
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  }

  return (
    <DropdownMenuItem>
      <Link href={href}>
        <a onClick={onClick}>{name}</a>
      </Link>
    </DropdownMenuItem>
  );
}

export function UserDropdown() {
  const auth = useAuth();

  async function logOut() {
    await auth.logOut();
    window.location.reload();
  }

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer appearance-none items-center">
          <span className="relative mr-1 h-8 w-8">
            <Avatar src={auth.user.avatarUrl} alt="User avatar" />
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent portalled sideOffset={6} align="start">
        <DropdownItem name="Your Profile" href="/user" />
        <DropdownMenuSeparator className="my-2 h-px bg-gray-300" />
        <DropdownMenuItem>
          <a onClick={() => handleRequest(logOut)}>Log Out</a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </Dropdown>
  );
}
