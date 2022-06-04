import { CharitableAidApplication } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import format from 'date-fns/format';
import { useTranslation } from 'next-i18next';

type CharitableAidApplicationRowProps = {
  charitableAidApplication: CharitableAidApplication;
};

export function CharitableAidApplicationRow({ charitableAidApplication }: CharitableAidApplicationRowProps) {
  const { id, status, statusUpdatedAt, charitableAid } = charitableAidApplication;
  const { t } = useTranslation('common');

  return (
    <Tr key={id}>
      <Td>
        <a
          className="text-blue-600 hover:underline"
          href={charitableAid.pageUrl}
          target="_blank"
          rel="noreferrer">
          {charitableAid.name}
        </a>
      </Td>
      <Td className="text-center">{t(`charitableAidApplicationStatuses.${status}`)}</Td>
      <Td>{format(new Date(statusUpdatedAt), 'E, d MMM yyyy, hh:mm a')}</Td>
    </Tr>
  );
}
