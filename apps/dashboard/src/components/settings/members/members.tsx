import { AddMemberButton } from './add-member-button';
import { MembersTable } from './members-table';
import { ReloadMembersButton } from './reload-members-button';
import { MembersProvider } from '@components/providers';

export function Members() {
  return (
    <MembersProvider>
      <div>
        <div className="mb-2 flex items-center justify-end gap-2">
          <ReloadMembersButton />
          <AddMemberButton />
        </div>
        <MembersTable />
      </div>
    </MembersProvider>
  );
}
