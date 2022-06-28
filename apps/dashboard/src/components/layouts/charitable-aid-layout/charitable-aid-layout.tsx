import { AppLayout } from '../app-layout';
import { CharitableAidTabs } from './charitable-aid-tabs';
import { NextSeo } from 'next-seo';

type CharitableAidLayoutProps = {
  children: React.ReactNode;
};

export function CharitableAidLayout({ children }: CharitableAidLayoutProps) {
  return (
    <AppLayout>
      <NextSeo title="Charitable Aid" />
      <CharitableAidTabs />
      <div className="px-4 py-2">{children}</div>
    </AppLayout>
  );
}
