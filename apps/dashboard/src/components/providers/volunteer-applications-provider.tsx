import { useVolunteerApplications } from '@myhearty/hooks';
import { createContext, useContext, useMemo } from 'react';

type VolunteerApplications = ReturnType<typeof useVolunteerApplications>;

export const VolunteerApplicationsContext = createContext<VolunteerApplications>({} as VolunteerApplications);

function useVolunteerApplicationsContext() {
  return useContext(VolunteerApplicationsContext);
}

export { useVolunteerApplicationsContext as useVolunteerApplications };

type VolunteerApplicationsProviderProps = {
  volunteerEventIdOrSlug: string;
  children: React.ReactNode;
};

export function VolunteerApplicationsProvider({
  volunteerEventIdOrSlug,
  children,
}: VolunteerApplicationsProviderProps) {
  const volunteerApplicationsProvider = useVolunteerApplicationsProvider(volunteerEventIdOrSlug);

  return (
    <VolunteerApplicationsContext.Provider value={volunteerApplicationsProvider}>
      {children}
    </VolunteerApplicationsContext.Provider>
  );
}

function useVolunteerApplicationsProvider(volunteerEventIdOrSlug: string) {
  const volunteerApplications = useVolunteerApplications(volunteerEventIdOrSlug);
  const volunteerApplicationsProvider = useMemo(
    () => volunteerApplications,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(volunteerApplications)
  );

  return volunteerApplicationsProvider;
}
