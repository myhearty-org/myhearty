import { useAuth } from '@components/providers';
import { Loader } from '@myhearty/ui/loader';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

type NoAuthProps = {
  children: React.ReactNode;
};

export function NoAuth({ children }: NoAuthProps) {
  const auth = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (auth.isAuthenticated) {
      router.replace('/');
    }
  }, [auth.isAuthenticated, router]);

  if (auth.isAuthenticated) {
    return <Loader text="Redirecting..." />;
  }

  return <>{children}</>;
}
