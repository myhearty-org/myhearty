import { Footer } from './footer';
import { Header } from './header';
import { Main } from './main';
import { XIcon } from '@heroicons/react/solid';
import { toast, ToastBar, Toaster } from 'react-hot-toast';

type LayoutProps = {
  children: React.ReactNode;
};

export function Layout({ children }: LayoutProps) {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <Main>{children}</Main>
      <Footer />
      <Toaster position="top-right">
        {(t) => (
          <ToastBar toast={t}>
            {({ icon, message }) => (
              <>
                {icon}
                {message}
                {t.type !== 'loading' && (
                  <button className="rounded p-1" onClick={() => toast.dismiss(t.id)}>
                    <XIcon className="h-4 w-4" />
                  </button>
                )}
              </>
            )}
          </ToastBar>
        )}
      </Toaster>
    </div>
  );
}
