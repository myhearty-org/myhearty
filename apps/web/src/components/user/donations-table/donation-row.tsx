import { Badge } from '@mantine/core';
import { PAYMENT_STATUS_BADGES } from '@myhearty/lib/constants/badges';
import { Donation } from '@myhearty/lib/types';
import { Td, Tr } from '@myhearty/ui/table';
import cn from 'classnames';
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
      <Td className="whitespace-nowrap font-mono text-xs">{donationId}</Td>
      <Td className="whitespace-nowrap text-right">RM{netAmount}</Td>
      <Td className="whitespace-nowrap text-right">RM{fee}</Td>
      <Td className="whitespace-nowrap text-center">{t(`paymentMethods.${paymentMethod}`)}</Td>
      <Td className="text-center">
        <Badge
          className={cn(
            PAYMENT_STATUS_BADGES[status].backgroundColor,
            PAYMENT_STATUS_BADGES[status].textColor
          )}>
          {t(`paymentStatuses.${status}`)}
        </Badge>
      </Td>
      <Td className="whitespace-nowrap">{format(new Date(completedAt), 'yyyy-MM-dd HH:mm:ss')}</Td>
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
