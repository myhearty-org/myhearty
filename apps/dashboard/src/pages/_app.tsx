import { AuthProvider } from '@components/providers';
import { MantineProvider } from '@mantine/core';
import { MANTINE_CLASSNAMES, MANTINE_DEFAULT_PROPS, MANTINE_THEME } from '@myhearty/lib/constants/mantine';
import { AppPropsWithLayout } from '@myhearty/lib/types';
import { storePathHistory } from '@myhearty/utils/common';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import defaultSeoConfig from 'next-seo.json';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { useEffect } from 'react';
import 'styles/globals.css';
import 'styles/preflight.css';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  useEffect(() => {
    storePathHistory();
  }, [router.asPath]);

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <MantineProvider
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={MANTINE_THEME}
        defaultProps={MANTINE_DEFAULT_PROPS}
        classNames={MANTINE_CLASSNAMES}>
        <AuthProvider>
          <NextNProgress
            color="#ec4899"
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          {getLayout(<Component {...pageProps} />)}
        </AuthProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
