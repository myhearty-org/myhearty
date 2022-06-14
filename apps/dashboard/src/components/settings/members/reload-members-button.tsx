import { useMembers } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';

export function ReloadMembersButton() {
  const { isLoading, mutate } = useMembers();

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
