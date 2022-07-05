import { SettingsLayout } from '@components/layouts';
import { useAuth } from '@components/providers';
import { Members } from '@components/settings/members';
import { Alert } from '@myhearty/ui/alert';

export default function MembersSettingPage() {
  const auth = useAuth();

  if (!auth.member.admin) {
    return (
      <div className="flex justify-center">
        <Alert severity="warning" title="Only organization admin can manage members." />
      </div>
    );
  }

  return <Members />;
}

MembersSettingPage.getLayout = (page: React.ReactElement) => <SettingsLayout>{page}</SettingsLayout>;
