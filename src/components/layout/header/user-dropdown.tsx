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
import { handleUnknownError } from '@utils/errors';
import { showToast } from '@utils/show-toast';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { forwardRef } from 'react';

type DropdownItemProps = {
  name: string;
  href: string;
};

function DropdownItem({ name, href }: DropdownItemProps) {
  // prettier-ignore
  // Manually forward ref to <a> as Next's Link does not pass ref
  // to its children properly. ref is required to ensure dropdown
  // menu is closed after the item was clicked.
  const AnchorWithRef = forwardRef<HTMLAnchorElement, { name: string }>(
    function AnchorWithRef({ name }, forwardedRef) {
      return <a ref={forwardedRef}>{name}</a>;
    }
  );

  return (
    <DropdownMenuItem className="flex cursor-pointer px-4 py-1 text-sm hover:bg-pink-500 hover:text-white">
      <Link href={href} passHref>
        <AnchorWithRef name={name} />
      </Link>
    </DropdownMenuItem>
  );
}

export function UserDropdown() {
  const auth = useAuth();
  const router = useRouter();

  async function logOut() {
    try {
      await auth.logOut();
      router.reload();
    } catch (error) {
      showToast(handleUnknownError(error).message, 'error');
    }
  }

  return (
    <Dropdown>
      <DropdownMenuTrigger asChild>
        <button className="group flex cursor-pointer appearance-none items-center">
          <span className="relative mr-1 h-8 w-8">
            <Avatar src={auth.user.avatar_url} alt="User avatar" />
          </span>
          <ChevronDownIcon className="h-4 w-4 text-gray-400 group-hover:text-gray-600" />
        </button>
      </DropdownMenuTrigger>
      <DropdownMenuContent portalled sideOffset={6}>
        <DropdownItem name="Your Profile" href="/user" />
        <DropdownMenuSeparator className="h-px bg-gray-300 my-2" />
        <DropdownMenuItem>
          <a
            className="flex cursor-pointer px-4 py-1 text-sm hover:bg-pink-500 hover:text-white"
            onClick={logOut}>
            Log Out
          </a>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </Dropdown>
  );
}
