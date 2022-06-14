import { SettingsLayout } from '@components/layouts';
import { Members } from '@components/settings/members';

export default function MembersSettingPage() {
  return <Members />;
}

MembersSettingPage.getLayout = (page: React.ReactElement) => <SettingsLayout>{page}</SettingsLayout>;
