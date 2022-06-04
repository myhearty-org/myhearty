import { VolunteerApplication } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import format from 'date-fns/format';
import { useTranslation } from 'next-i18next';

type VolunteerApplicationRowProps = {
  volunteerApplication: VolunteerApplication;
};

export function VolunteerApplicationRow({ volunteerApplication }: VolunteerApplicationRowProps) {
  const { id, status, statusUpdatedAt, attendance, attendanceUpdatedAt, volunteerEvent } =
    volunteerApplication;
  const { t } = useTranslation('common');

  return (
    <Tr key={id}>
      <Td>
        <a
          className="text-blue-600 hover:underline"
          href={volunteerEvent.pageUrl}
          target="_blank"
          rel="noreferrer">
          {volunteerEvent.name}
        </a>
      </Td>
      <Td>{format(new Date(volunteerEvent.startDatetime), 'E, d MMM yyyy, hh:mm a')}</Td>
      <Td className="text-center">{t(`volunteerApplicationStatuses.${status}`)}</Td>
      <Td>{format(new Date(statusUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
      <Td className="text-center">{t(`volunteerApplicationAttendances.${attendance}`)}</Td>
      <Td>{format(new Date(attendanceUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
    </Tr>
  );
}
