import { useCharitableAidApplications } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';

export function ReloadCharitableAidApplicationsButton() {
  const { isLoading, mutate } = useCharitableAidApplications();

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
