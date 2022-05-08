import { ClearRefinements } from '@components/search';
import SimpleBar from 'simplebar-react';

type DesktopRefinementListProps = {
  children: React.ReactNode;
};

export function DesktopRefinementList({ children }: DesktopRefinementListProps) {
  return (
    <aside className="relative col-span-2 hidden flex-shrink-0 bg-gray-100 pl-4 lg:block">
      <SimpleBar className="sticky top-0 max-h-screen space-y-4 overflow-y-auto pb-8 pt-3">
        <div className="space-y-4 px-1">
          {children}
          <ClearRefinements />
        </div>
      </SimpleBar>
    </aside>
  );
}
