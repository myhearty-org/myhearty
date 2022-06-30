import { useVolunteerApplications } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';

export function ReloadVolunteerApplicationsButton() {
  const { isLoading, mutate } = useVolunteerApplications();

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
