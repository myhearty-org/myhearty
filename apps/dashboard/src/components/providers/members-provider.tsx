import { useMembers } from '@myhearty/hooks/queries';
import { createContext, useContext, useMemo } from 'react';

type Members = ReturnType<typeof useMembers>;

export const MembersContext = createContext<Members>({} as Members);

function useMembersContext() {
  return useContext(MembersContext);
}

export { useMembersContext as useMembers };

type MembersProviderProps = {
  children: React.ReactNode;
};

export function MembersProvider({ children }: MembersProviderProps) {
  const membersProvider = useMembersProvider();

  return <MembersContext.Provider value={membersProvider}>{children}</MembersContext.Provider>;
}

function useMembersProvider() {
  const members = useMembers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const membersProvider = useMemo(() => members, Object.values(members));

  return membersProvider;
}
