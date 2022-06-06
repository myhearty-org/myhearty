import { Layout } from '@components/layout';
import { AuthProvider } from '@components/providers';
import { MantineProvider } from '@mantine/core';
import { MANTINE_CLASSNAMES, MANTINE_DEFAULT_PROPS, MANTINE_THEME } from '@myhearty/lib/constants/mantine';
import { storePathHistory } from '@myhearty/utils/common';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import defaultSeoConfig from 'next-seo.json';
import type { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import 'styles/globals.css';
import 'styles/preflight.css';

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter();

  useEffect(() => {
    storePathHistory();
  }, [router.asPath]);

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <MantineProvider
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={MANTINE_THEME}
        defaultProps={MANTINE_DEFAULT_PROPS}
        classNames={MANTINE_CLASSNAMES}>
        <AuthProvider>
          <Layout>
            <NextNProgress
              color="#ec4899"
              startPosition={0.3}
              stopDelayMs={200}
              height={2}
              showOnShallow={true}
              options={{ showSpinner: false }}
            />
            <Component {...pageProps} />
          </Layout>
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
