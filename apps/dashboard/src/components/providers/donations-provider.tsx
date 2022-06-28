import { useDonations } from '@myhearty/hooks';
import { createContext, useContext, useMemo } from 'react';

type Donations = ReturnType<typeof useDonations>;

export const DonationsContext = createContext<Donations>({} as Donations);

function useDonationsContext() {
  return useContext(DonationsContext);
}

export { useDonationsContext as useDonations };

type DonationsProviderProps = {
  fundraisingCampaignIdOrSlug: string;
  children: React.ReactNode;
};

export function DonationsProvider({ fundraisingCampaignIdOrSlug, children }: DonationsProviderProps) {
  const donationsProvider = useDonationsProvider(fundraisingCampaignIdOrSlug);

  return <DonationsContext.Provider value={donationsProvider}>{children}</DonationsContext.Provider>;
}

function useDonationsProvider(fundraisingCampaignIdOrSlug: string) {
  const donations = useDonations(fundraisingCampaignIdOrSlug);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const donationsProvider = useMemo(() => donations, Object.values(donations));

  return donationsProvider;
}
