import { CardButton } from '@myhearty/ui/card-button';
import { Skeleton } from '@mantine/core';

export function LoadingResourceCard() {
  return (
    <CardButton>
      <Skeleton className="w-4/5 rounded-md py-3" />
    </CardButton>
  );
}
