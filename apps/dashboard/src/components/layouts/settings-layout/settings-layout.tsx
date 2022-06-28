import { AppLayout } from '../app-layout';
import { SettingsTabs } from './settings-tabs';
import { NextSeo } from 'next-seo';

type SettingsLayoutProps = {
  children: React.ReactNode;
};

export function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <AppLayout>
      <NextSeo title="Settings" />
      <SettingsTabs />
      <div className="px-4 py-2">{children}</div>
    </AppLayout>
  );
}
