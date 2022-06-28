import { AuthProvider } from '@components/providers';
import { MantineProvider } from '@mantine/core';
import { ModalsProvider } from '@mantine/modals';
import { MANTINE_CLASSNAMES, MANTINE_DEFAULT_PROPS, MANTINE_THEME } from '@myhearty/lib/constants/mantine';
import { AppPropsWithLayout } from '@myhearty/lib/types';
import { showToast } from '@myhearty/utils/show-toast';
import { appWithTranslation } from 'next-i18next';
import { DefaultSeo } from 'next-seo';
import defaultSeoConfig from 'next-seo.json';
import { useRouter } from 'next/router';
import NextNProgress from 'nextjs-progressbar';
import { Toaster } from 'react-hot-toast';
import 'styles/globals.css';
import 'styles/preflight.css';
import { SWRConfig } from 'swr';

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const router = useRouter();

  const getLayout = Component.getLayout ?? ((page) => page);

  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <MantineProvider
        emotionOptions={{ key: 'mantine', prepend: false }}
        theme={MANTINE_THEME}
        defaultProps={MANTINE_DEFAULT_PROPS}
        classNames={MANTINE_CLASSNAMES}>
        <ModalsProvider>
          <NextNProgress
            color="#ec4899"
            startPosition={0.3}
            stopDelayMs={200}
            height={2}
            showOnShallow={true}
            options={{ showSpinner: false }}
          />
          <Toaster position="top-right" />
          <SWRConfig
            value={{
              revalidateOnFocus: false,
              revalidateOnReconnect: false,
              onError: () => showToast('An unexpected error has occured. Please try again later.', 'error'),
            }}>
            <AuthProvider>{getLayout(<Component {...pageProps} />)}</AuthProvider>
          </SWRConfig>
        </ModalsProvider>
      </MantineProvider>
    </>
  );
}

export default appWithTranslation(MyApp);
