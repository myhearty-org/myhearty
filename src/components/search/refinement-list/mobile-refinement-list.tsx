import { AdjustmentsIcon, XIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import { Children } from 'react';
import { ClearRefinements } from 'react-instantsearch-dom';
import SimpleBar from 'simplebar-react';

type MobileRefinementListProps = {
  showFilter: boolean;
  toggleShowFilter: (value: any) => void;
  children: React.ReactNode[];
};

export function MobileRefinementList({ showFilter, toggleShowFilter, children }: MobileRefinementListProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-30 max-h-[350px] w-full overflow-hidden rounded-t-md bg-gray-100 drop-shadow-2xl transition-all duration-150 ease-in-out',
        {
          'visible block translate-y-0 opacity-100 lg:hidden': showFilter,
          'invisible hidden translate-y-5 opacity-0 lg:hidden': !showFilter,
        }
      )}>
      <div className="flex w-full items-center justify-between bg-white px-2 text-sm">
        <ClearRefinements className="p-1" />
        <button className="rounded-md px-3 py-2" onClick={toggleShowFilter}>
          Done
        </button>
      </div>
      <SimpleBar className="max-h-[300px] px-1 py-2">
        <div className="grid w-full grid-cols-2 gap-5 px-2">
          {Children.map(children, (child) => (
            <div className="shrink-0">{child}</div>
          ))}
        </div>
      </SimpleBar>
    </div>
  );
}

type FilterToggleProps = {
  showFilter: boolean;
  toggleShowFilter: (value: any) => void;
  refinementCount: number;
};

export function FilterToggle({ showFilter, toggleShowFilter, refinementCount }: FilterToggleProps) {
  return (
    <button
      onClick={toggleShowFilter}
      className="fixed bottom-3 right-3 z-40 flex items-center rounded-full bg-pink-500 px-4 py-2 text-sm font-medium text-white lg:hidden">
      <span className="pr-1">Filter</span>
      {refinementCount > 0 ? (
        <div className="-mr-1 flex h-6 w-6 scale-75 transform items-center justify-center rounded-full bg-pink-600 text-sm font-bold text-white">
          {refinementCount}
        </div>
      ) : showFilter ? (
        <XIcon className="h-4 w-4 sm:ml-1" />
      ) : (
        <AdjustmentsIcon className="h-4 w-4 sm:ml-1" />
      )}
    </button>
  );
}
