import { DeleteMemberDropdownItem } from './delete-member-dropdown-item';
import { DotsHorizontalIcon } from '@heroicons/react/solid';
import { Button, Menu } from '@mantine/core';
import { Member } from '@myhearty/lib/types';

type MemberDropdownProps = {
  member: Member;
};

export function MemberDropdown({ member }: MemberDropdownProps) {
  return (
    <Menu
      size={180}
      transition="pop-top-right"
      control={
        <Button className="h-5 hover:bg-gray-200 focus:ring-0" variant="subtle" color="gray" size="xs">
          <DotsHorizontalIcon className="h-4 w-4" />
        </Button>
      }
      placement="end"
      position="bottom">
      <DeleteMemberDropdownItem member={member} />
    </Menu>
  );
}
