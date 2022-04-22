import { Layout } from '@components/layout';
import type { AppProps } from 'next/app';
import 'styles/globals.css';
import { DefaultSeo } from 'next-seo';
import defaultSeoConfig from 'next-seo.json';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...defaultSeoConfig} />
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  );
}

export default MyApp;
