import { useDonations } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useFundraisingCampaign, useMetrics } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function ReloadDonationsButton() {
  const router = useRouter();
  const { slug } = router.query;
  
  const { isLoading: isFundraisingCampaignLoading, mutate: mutateFundraisingCampaign } =
    useFundraisingCampaign(slug as string);
  const { isLoading: isDonationsLoading, mutate: mutateDonations } = useDonations();
  const { isLoading: isMetricsLoading, mutate: mutateMetrics } = useMetrics(slug as string);

  function onClick() {
    mutateFundraisingCampaign();
    mutateDonations();
    mutateMetrics();
  }

  return (
    <Button
      variant="default"
      size="xs"
      leftIcon={<RefreshIcon className="h-3 w-3" />}
      loading={isFundraisingCampaignLoading || isDonationsLoading || isMetricsLoading}
      onClick={onClick}>
      Reload
    </Button>
  );
}
