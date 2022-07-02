import { LoadingPanel } from '@components/ui/loading';
import { Button } from '@mantine/core';
import { useModals } from '@mantine/modals';
import { useFundraisingCampaign } from '@myhearty/hooks';
import { deleteFundraisingCampaign } from '@myhearty/lib/organizations';
import { Panel } from '@myhearty/ui/panel';
import { handleRequest } from '@myhearty/utils/api';
import { showToast } from '@myhearty/utils/show-toast';
import { useRouter } from 'next/router';

export function FundraisingCampaignDangerZone() {
  const router = useRouter();
  const { slug } = router.query;
  
  const { fundraisingCampaign } = useFundraisingCampaign(slug as string);

  async function handleDelete() {
    await deleteFundraisingCampaign(fundraisingCampaign!.id);
    showToast(`Succesfully deleted ${fundraisingCampaign!.name}.`, 'success');

    router.replace('/campaigns');
  }

  const modals = useModals();

  const openDeleteFundraisingCampaignModal = () =>
    modals.openConfirmModal({
      centered: true,
      title: 'Confirm to delete fundraising campaign',
      children: (
        <p>
          Are you sure you want to delete {fundraisingCampaign!.name}? This action is permanent and
          destructive.
        </p>
      ),
      labels: { confirm: 'Confirm', cancel: 'Cancel' },
      confirmProps: { color: 'red' },
      onConfirm: () => handleRequest(handleDelete),
    });

  if (!fundraisingCampaign) {
    return <LoadingPanel />;
  }

  if (fundraisingCampaign.published) {
    return null;
  }

  return (
    <Panel title={<p className="font-medium">Danger Zone</p>}>
      <Panel.Content>
        <div className="flex justify-between">
          <div>
            <p className="text-sm font-medium">Delete this fundraising campaign</p>
            <p className="text-sm">
              Once you delete a fundraising campaign, there is no going back. Please be certain.
            </p>
          </div>
          <Button
            className="text-red-500 transition-all hover:border-red-500 hover:bg-red-500 hover:text-white"
            variant="default"
            onClick={openDeleteFundraisingCampaignModal}>
            Delete fundraising campaign
          </Button>
        </div>
      </Panel.Content>
    </Panel>
  );
}
