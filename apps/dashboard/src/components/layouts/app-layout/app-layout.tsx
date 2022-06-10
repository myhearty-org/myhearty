import { AppShell } from './app-shell';
import { AuthRequired } from '@components/helpers';
import { OrganizationProvider } from '@components/providers';

type AppLayoutProps = {
  children: React.ReactNode;
};

export function AppLayout({ children }: AppLayoutProps) {
  return (
    <AuthRequired>
      <OrganizationProvider>
        <AppShell>{children}</AppShell>
      </OrganizationProvider>
    </AuthRequired>
  );
}
