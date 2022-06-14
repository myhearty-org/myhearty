import { useMembers } from '@components/providers';
import { TrashIcon } from '@heroicons/react/outline';
import { Menu } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { deleteMember } from '@myhearty/lib/organizations';
import { Member } from '@myhearty/lib/types';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';

type DeleteMemberDropdownItemProps = {
  member: Member;
};

export function DeleteMemberDropdownItem({ member }: DeleteMemberDropdownItemProps) {
  const { mutate } = useMembers();

  async function handleDelete() {
    await deleteMember(member.id);
    showToast(`Succesfully deleted ${member.email}.`, 'success');

    mutate();
  }

  const modals = useModals();

  const openDeleteMemberModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm to delete member',
      children: (
        <p>Are you sure you want to delete {member.email}? This action is permanent and destructive.</p>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleRequest(handleDelete),
    });

  return (
    <Menu.Item onClick={openDeleteMemberModal}>
      <div className="flex items-center">
        <TrashIcon className="mr-3 h-4 w-4 flex-shrink-0 text-gray-500 group-hover:text-white" />
        <span className="min-w-0 break-words text-sm">Delete member</span>
      </div>
    </Menu.Item>
  );
}
