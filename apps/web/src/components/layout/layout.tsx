import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { ToastProvider } from '@myhearty/ui/toast-provider';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
      <ToastProvider />
    </div>
  );
}
