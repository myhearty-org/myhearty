import { useCharitableAidApplications } from '@myhearty/hooks';
import { createContext, useContext, useMemo } from 'react';

type CharitableAidApplications = ReturnType<typeof useCharitableAidApplications>;

export const CharitableAidApplicationsContext = createContext<CharitableAidApplications>(
  {} as CharitableAidApplications
);

function useCharitableAidApplicationsContext() {
  return useContext(CharitableAidApplicationsContext);
}

export { useCharitableAidApplicationsContext as useCharitableAidApplications };

type CharitableAidApplicationsProviderProps = {
  charitableAidIdOrSlug: string;
  children: React.ReactNode;
};

export function CharitableAidApplicationsProvider({
  charitableAidIdOrSlug,
  children,
}: CharitableAidApplicationsProviderProps) {
  const charitableAidApplicationsProvider = useCharitableAidApplicationsProvider(charitableAidIdOrSlug);

  return (
    <CharitableAidApplicationsContext.Provider value={charitableAidApplicationsProvider}>
      {children}
    </CharitableAidApplicationsContext.Provider>
  );
}

function useCharitableAidApplicationsProvider(charitableAidIdOrSlug: string) {
  const charitableAidApplications = useCharitableAidApplications(charitableAidIdOrSlug);
  const charitableAidApplicationsProvider = useMemo(
    () => charitableAidApplications,
    // eslint-disable-next-line react-hooks/exhaustive-deps
    Object.values(charitableAidApplications)
  );

  return charitableAidApplicationsProvider;
}
