import { getAuthenticatedOrganization } from '@myhearty/lib/organizations';
import { Organization } from '@myhearty/lib/types';
import { createContext, useContext, useEffect, useMemo, useState } from 'react';

export const OrganizationContext = createContext<Organization | undefined>(undefined);

export function useOrganization() {
  return useContext(OrganizationContext);
}

type OrganizationProviderProps = {
  children: React.ReactNode;
};

export function OrganizationProvider({ children }: OrganizationProviderProps) {
  const organizationProvider = useOrganizationProvider();

  return <OrganizationContext.Provider value={organizationProvider}>{children}</OrganizationContext.Provider>;
}

function useOrganizationProvider() {
  const [organization, setOrganization] = useState<Organization>();

  useEffect(() => {
    async function getOrganization() {
      const organization = await getAuthenticatedOrganization();
      setOrganization(organization);
    }
    getOrganization();
  }, []);

  const organizationProvider = useMemo(() => organization, [organization]);

  return organizationProvider;
}
