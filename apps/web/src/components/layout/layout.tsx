import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
