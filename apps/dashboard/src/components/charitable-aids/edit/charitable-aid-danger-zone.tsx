import { LoadingPanel } from '@components/ui/loading';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useCharitableAid } from '@myhearty/hooks';
import { deleteCharitableAid } from '@myhearty/lib/organizations';
import { Panel } from '@myhearty/ui/panel';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';

export function CharitableAidDangerZone() {
  const router = useRouter();
  const { slug } = router.query;
  const { charitableAid } = useCharitableAid(slug as string);

  async function handleDelete() {
    await deleteCharitableAid(charitableAid!.id);
    showToast(`Succesfully deleted ${charitableAid!.name}.`, 'success');

    router.replace('/aids');
  }

  const modals = useModals();

  const openDeleteCharitableAidModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm to delete charitable aid',
      children: (
        <p>
          Are you sure you want to delete {charitableAid!.name}? This action is permanent and destructive.
        </p>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleRequest(handleDelete),
    });

  if (!charitableAid) {
    return <LoadingPanel />;
  }

  if (charitableAid.published) {
    return null;
  }

  return (
    <Panel title={<p className="font-medium">Danger Zone</p>}>
      <Panel.Content>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Delete this charitable aid</p>
            <p className="text-sm">
              Once you delete a charitable aid, there is no going back. Please be certain.
            </p>
          </div>
          <Button
            className="text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
            variant="default"
            onClick={openDeleteCharitableAidModal}>
            Delete charitable aid
          </Button>
        </div>
      </Panel.Content>
    </Panel>
  );
}
