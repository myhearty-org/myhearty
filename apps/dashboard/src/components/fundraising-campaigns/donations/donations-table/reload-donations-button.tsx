import { useDonations } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';

export function ReloadDonationsButton() {
  const { isLoading, mutate } = useDonations();

  return (
    <Button
      variant="default"
      size="xs"
      leftIcon={<RefreshIcon className="h-3 w-3" />}
      loading={isLoading}
      onClick={() => mutate()}>
      Reload
    </Button>
  );
}
