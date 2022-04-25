import { Layout } from '@components/layout';
import { AuthProvider } from '@hooks/use-auth';
import { storePathHistory } from '@utils/common';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import defaultSeoConfig from 'next-seo.json';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import 'styles/globals.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();
  
  useEffect(() => {
    storePathHistory();
  }, [router.asPath]);

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <AuthProvider>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </AuthProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
