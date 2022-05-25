import { useLocalStorage } from '@hooks/index';
import { User } from '@lib/types';
import { logInUser, logOutUser, signUpUser } from '@lib/auth/users';
import { AxiosResponse } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { createContext, useCallback, useContext, useMemo } from 'react';

type AuthContextType = {
  user: User;
  isAuthenticated: boolean;
  signUp: (email: string, password: string) => Promise<AxiosResponse<any, any>>;
  logIn: (email: string, password: string) => Promise<User>;
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
  const [storedUser, setStoredUser] = useLocalStorage<User>('user', {} as User);

  const isAuthenticated = !isEmpty(storedUser);

  function signUp(email: string, password: string) {
    return signUpUser(email, password);
  }

  const logIn = useCallback(
    async (email: string, password: string) => {
      const user = await logInUser(email, password);
      setStoredUser(user);

      return user;
    },
    [setStoredUser]
  );

  const logOut = useCallback(async () => {
    await logOutUser();

    setStoredUser({} as User);
  }, [setStoredUser]);

  const authProvider = useMemo(
    () => ({
      user: storedUser,
      isAuthenticated,
      signUp,
      logIn,
      logOut,
    }),
    [storedUser, isAuthenticated, logIn, logOut]
  );

  return authProvider;
}
