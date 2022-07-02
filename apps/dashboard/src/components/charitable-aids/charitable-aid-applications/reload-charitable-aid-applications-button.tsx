import { useCharitableAidApplications } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useCharitableAid } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function ReloadCharitableAidApplicationsButton() {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading: isCharitableAidLoading, mutate: mutateCharitableAid } = useCharitableAid(slug as string);
  const { isLoading: isCharitableAidApplicationsLoading, mutate: mutateCharitableAidApplications } =
    useCharitableAidApplications();

  function onClick() {
    mutateCharitableAid();
    mutateCharitableAidApplications();
  }

  return (
    <Button
      variant="default"
      size="xs"
      leftIcon={<RefreshIcon className="h-3 w-3" />}
      loading={isCharitableAidLoading || isCharitableAidApplicationsLoading}
      onClick={onClick}>
      Reload
    </Button>
  );
}
