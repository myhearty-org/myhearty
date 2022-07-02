import { useVolunteerApplications } from '@components/providers';
import { RefreshIcon } from '@heroicons/react/solid';
import { Button } from '@mantine/core';
import { useVolunteerEvent } from '@myhearty/hooks';
import { useRouter } from 'next/router';

export function ReloadVolunteerApplicationsButton() {
  const router = useRouter();
  const { slug } = router.query;

  const { isLoading: isVolunteerEventLoading, mutate: mutateVolunteerEvent } = useVolunteerEvent(
    slug as string
  );
  const { isLoading: isVolunteerApplicationsLoading, mutate: mutateVolunteerApplications } =
    useVolunteerApplications();

  function onClick() {
    mutateVolunteerEvent();
    mutateVolunteerApplications();
  }

  return (
    <Button
      variant="default"
      size="xs"
      leftIcon={<RefreshIcon className="h-3 w-3" />}
      loading={isVolunteerEventLoading || isVolunteerApplicationsLoading}
      onClick={onClick}>
      Reload
    </Button>
  );
}
