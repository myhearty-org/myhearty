import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="fixed top-0 bottom-0 flex min-h-screen w-full flex-col overflow-x-auto">
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Toaster position="bottom-right" />
    </div>
  );
}
