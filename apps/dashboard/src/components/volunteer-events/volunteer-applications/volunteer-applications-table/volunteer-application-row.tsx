import { Badge } from '@mantine/core';
import {
  VOLUNTEER_APPLICATION_ATTENDANCE_BADGES,
  VOLUNTEER_APPLICATION_STATUS_BADGES,
} from '@myhearty/lib/constants/badges';
import { VolunteerApplication } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import cn from 'classnames';
import format from 'date-fns/format';
import { useTranslation } from 'next-i18next';

type VolunteerApplicationRowProps = {
  volunteerApplication: VolunteerApplication;
};

export function VolunteerApplicationRow({ volunteerApplication }: VolunteerApplicationRowProps) {
  const { id, status, statusUpdatedAt, attendance, attendanceUpdatedAt, volunteer } = volunteerApplication;
  const { t } = useTranslation('common');

  return (
    <Tr key={id}>
      <Td className="whitespace-nowrap">{volunteer?.name}</Td>
      <Td className="text-center">
        <Badge
          className={cn(
            VOLUNTEER_APPLICATION_STATUS_BADGES[status].backgroundColor,
            VOLUNTEER_APPLICATION_STATUS_BADGES[status].textColor
          )}>
          {t(`volunteerApplicationStatuses.${status}`)}
        </Badge>
      </Td>
      <Td className="whitespace-nowrap">{format(new Date(statusUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
      <Td className="text-center">
        <Badge
          className={cn(
            VOLUNTEER_APPLICATION_ATTENDANCE_BADGES[attendance].backgroundColor,
            VOLUNTEER_APPLICATION_ATTENDANCE_BADGES[attendance].textColor
          )}>
          {t(`volunteerApplicationAttendances.${attendance}`)}
        </Badge>
      </Td>
      <Td className="whitespace-nowrap">{format(new Date(attendanceUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
    </Tr>
  );
}
