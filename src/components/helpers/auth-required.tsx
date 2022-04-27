import { useAuth, useHasMounted } from '@hooks/index';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type AuthRequiredProps = {
  children: React.ReactNode;
};

export function AuthRequired({ children }: AuthRequiredProps) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!auth.isAuthenticated) {
      router.push('/login');
    }
  }, [auth.isAuthenticated, router]);

  const hasMounted = useHasMounted();

  return <>{hasMounted && auth.isAuthenticated && children}</>;
}
