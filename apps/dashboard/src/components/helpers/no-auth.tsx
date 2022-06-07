import { useAuth } from '@components/providers/auth-provider';
import { Loader } from '@myhearty/ui/loader';
import { getPathHistory } from '@myhearty/utils/common';
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
      const [previousPath] = getPathHistory();
      previousPath === '' ? router.replace('/') : router.back();
    }
  }, [auth.isAuthenticated, router]);

  if (auth.isAuthenticated) {
    return <Loader text="Redirecting..." />;
  }

  return <>{children}</>;
}
