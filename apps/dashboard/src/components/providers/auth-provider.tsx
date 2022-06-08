import { useLocalStorage } from '@myhearty/hooks';
import { logInMember, logOutMember } from '@myhearty/lib/auth/members';
import { Member } from '@myhearty/lib/types';
import isEmpty from 'lodash/isEmpty';
import { createContext, useCallback, useContext, useMemo } from 'react';

type AuthContextType = {
  member: Member;
  isAuthenticated: boolean;
  logIn: (email: string, password: string) => Promise<Member>;
  logOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export function useAuth() {
  return useContext(AuthContext);
}

type AuthProviderProps = {
  children: React.ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const authProvider = useAuthProvider();

  return <AuthContext.Provider value={authProvider}>{children}</AuthContext.Provider>;
}

function useAuthProvider() {
  const [storedMember, setStoredMember] = useLocalStorage<Member>('member', {} as Member);

  const isAuthenticated = !isEmpty(storedMember);

  const logIn = useCallback(
    async (email: string, password: string) => {
      const member = await logInMember(email, password);
      setStoredMember(member);

      return member;
    },
    [setStoredMember]
  );

  const logOut = useCallback(async () => {
    await logOutMember();

    setStoredMember({} as Member);
  }, [setStoredMember]);

  const authProvider = useMemo(
    () => ({
      member: storedMember,
      isAuthenticated,
      logIn,
      logOut,
    }),
    [storedMember, isAuthenticated, logIn, logOut]
  );

  return authProvider;
}
