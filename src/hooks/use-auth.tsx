import { useLocalStorage } from '@hooks/index';
import { User } from '@lib/types';
import { logInUser, logOutUser, signUpUser } from '@lib/users';
import { AxiosResponse } from 'axios';
import isEmpty from 'lodash/isEmpty';
import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

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
  const [user, setUser] = useState<User>(storedUser);

  useEffect(() => {
    setUser(storedUser);
  }, [storedUser]);

  const isAuthenticated = !isEmpty(user);

  function signUp(email: string, password: string) {
    return signUpUser(email, password);
  }

  const logIn = useCallback(
    async (email: string, password: string) => {
      const { data } = await logInUser(email, password);
      const user: User = {
        id: data.id,
        email: data.email,
        name: data.name,
        avatar_url: data.avatar_url,
      };

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
      user,
      isAuthenticated,
      signUp,
      logIn,
      logOut,
    }),
    [user, isAuthenticated, logIn, logOut]
  );

  return authProvider;
}
