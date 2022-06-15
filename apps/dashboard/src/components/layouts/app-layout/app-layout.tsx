import { AppShell } from './app-shell';
import { AuthRequired } from '@components/helpers';

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthRequired>
      <AppShell>{children}</AppShell>
    </AuthRequired>
  );
}
