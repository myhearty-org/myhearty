import { Skeleton } from '@mantine/core';
import { Panel } from '@myhearty/ui/panel';

export function LoadingPanel() {
  return (
    <Panel
      title={<Skeleton className="w-2/5 rounded-md py-3" />}
      footer={
        <div className="flex w-full items-center justify-end">
          <Skeleton className="flex w-1/5 rounded-md py-3" />
        </div>
      }>
      <Panel.Content>
        <Skeleton className="w-3/5 rounded-md py-3" />
      </Panel.Content>
    </Panel>
  );
}
