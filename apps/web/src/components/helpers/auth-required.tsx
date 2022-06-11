import { useAuth } from '@components/providers';
import { useHasMounted } from '@myhearty/hooks';
import { Loader } from '@myhearty/ui/loader';
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
  if (!hasMounted) return null;

  if (!auth.isAuthenticated) {
    return <Loader text="Redirecting to login page..." />;
  }

  return <>{children}</>;
}
