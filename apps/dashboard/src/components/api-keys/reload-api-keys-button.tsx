import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useApiKeys } from '@myhearty/hooks';

export function ReloadApiKeysButton() {
  const { isLoading, mutate } = useApiKeys();

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
