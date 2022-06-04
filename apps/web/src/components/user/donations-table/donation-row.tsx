import { Donation } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import format from 'date-fns/format';
import { useTranslation } from 'next-i18next';

type DonationRowProps = {
  donation: Donation;
};

export function DonationRow({ donation }: DonationRowProps) {
  const { id, donationId, fee, netAmount, paymentMethod, status, completedAt, fundraisingCampaign } =
    donation;
  const { t } = useTranslation('common');

  return (
    <Tr key={id}>
      <Td className="font-mono text-xs">{donationId}</Td>
      <Td className="text-right">RM{netAmount}</Td>
      <Td className="text-right">RM{fee}</Td>
      <Td className="text-center">{t(`paymentMethods.${paymentMethod}`)}</Td>
      <Td className="text-center">{t(`paymentStatuses.${status}`)}</Td>
      <Td>{format(new Date(completedAt), 'yyyy-MM-dd HH:mm:ss')}</Td>
      <Td>
        <a
          className="text-blue-600 hover:underline"
          href={fundraisingCampaign.pageUrl}
          target="_blank"
          rel="noreferrer">
          {fundraisingCampaign.name}
        </a>
      </Td>
    </Tr>
  );
}
