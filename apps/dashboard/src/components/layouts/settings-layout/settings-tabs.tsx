import { Tabs } from '@mantine/core';
import { useRouter } from 'next/router';

type SettingsTab = {
  name: string;
  label: string;
};

const settingsTabs: SettingsTab[] = [{ name: 'members', label: 'Members' }];

export function SettingsTabs() {
  const router = useRouter();
  const activeTabName = router.asPath.split('/')[2];
  const activeTabIndex = settingsTabs.findIndex((settingsTab) => settingsTab.name === activeTabName);

  function onTabChange(tabIndex: number, tabKey: string) {
    router.push(`/settings/${tabKey}`);
  }

  return (
    <nav>
      <div className="mb-2">
        <Tabs active={activeTabIndex} onTabChange={onTabChange}>
          {settingsTabs.map((settingsTab, i) => (
            <Tabs.Tab key={i} label={settingsTab.label} tabKey={settingsTab.name} />
          ))}
        </Tabs>
      </div>
    </nav>
  );
}
