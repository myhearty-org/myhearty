import { MemberDropdown } from './member-dropdown';
import { Member } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import format from 'date-fns/format';

type MemberRowProps = {
  member: Member;
};

export function MemberRow({ member }: MemberRowProps) {
  const { id, email, createdAt } = member;

  return (
    <Tr key={id}>
      <Td className="whitespace-nowrap">{id}</Td>
      <Td className="whitespace-nowrap">{email}</Td>
      <Td className="whitespace-nowrap">{format(new Date(createdAt), 'd MMM yyyy, HH:mm')}</Td>
      <Td className="text-right">
        <MemberDropdown member={member} />
      </Td>
    </Tr>
  );
}
