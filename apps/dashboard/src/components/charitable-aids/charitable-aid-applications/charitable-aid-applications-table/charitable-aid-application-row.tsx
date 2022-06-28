import { Badge } from '@mantine/core';
import { CHARITABLE_AID_APPLICATION_STATUS_BADGES } from '@myhearty/lib/constants/badges';
import { CharitableAidApplication } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import cn from 'classnames';
import format from 'date-fns/format';
import { useTranslation } from 'next-i18next';

type CharitableAidApplicationRowProps = {
  charitableAidApplication: CharitableAidApplication;
};

export function CharitableAidApplicationRow({ charitableAidApplication }: CharitableAidApplicationRowProps) {
  const { id, status, statusUpdatedAt, reason, receiver } = charitableAidApplication;
  const { t } = useTranslation('common');

  return (
    <Tr key={id}>
      <Td className="whitespace-nowrap">{receiver?.name}</Td>
      <Td className="text-center">
        <Badge
          className={cn(
            CHARITABLE_AID_APPLICATION_STATUS_BADGES[status].backgroundColor,
            CHARITABLE_AID_APPLICATION_STATUS_BADGES[status].textColor
          )}>
          {t(`charitableAidApplicationStatuses.${status}`)}
        </Badge>
      </Td>
      <Td className="whitespace-nowrap">{format(new Date(statusUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
    </Tr>
  );
}
