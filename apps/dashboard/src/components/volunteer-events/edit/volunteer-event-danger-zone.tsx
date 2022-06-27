import { LoadingPanel } from '@components/ui/loading';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useVolunteerEvent } from '@myhearty/hooks';
import { deleteVolunteerEvent } from '@myhearty/lib/organizations';
import { Panel } from '@myhearty/ui/panel';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';

export function VolunteerEventDangerZone() {
  const router = useRouter();
  const { slug } = router.query;
  const { volunteerEvent } = useVolunteerEvent(slug as string);

  async function handleDelete() {
    await deleteVolunteerEvent(volunteerEvent!.id);
    showToast(`Succesfully deleted ${volunteerEvent!.name}.`, 'success');

    router.replace('/volunteer-events');
  }

  const modals = useModals();

  const openDeleteVolunteerEventModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm to delete volunteer event',
      children: (
        <p>
          Are you sure you want to delete {volunteerEvent!.name}? This action is permanent and destructive.
        </p>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleRequest(handleDelete),
    });

  if (!volunteerEvent) {
    return <LoadingPanel />;
  }

  if (volunteerEvent.published) {
    return null;
  }

  return (
    <Panel title={<p className="font-medium">Danger Zone</p>}>
      <Panel.Content>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Delete this volunteer event</p>
            <p className="text-sm">
              Once you delete a volunteer event, there is no going back. Please be certain.
            </p>
          </div>
          <Button
            className="text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
            variant="default"
            onClick={openDeleteVolunteerEventModal}>
            Delete volunteer event
          </Button>
        </div>
      </Panel.Content>
    </Panel>
  );
}
