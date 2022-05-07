import { SearchResultCard } from './search-result-card';
import {
  ClearRefinements as ClearRefinementsButton,
  Hits,
  NoSearchResults,
  Pagination,
  RangeSlider,
  RefinementList,
  SearchBox,
  Stats,
} from '@components/search';
import { AdjustmentsIcon, XIcon } from '@heroicons/react/solid';
import cn from 'classnames';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { ClearRefinements, Configure, InstantSearch, SortBy } from 'react-instantsearch-dom';
import { useToggle } from 'react-use';
import SimpleBar from 'simplebar-react';

type FilterToggleProps = {
  showFilter: boolean;
  toggleShowFilter: (value: any) => void;
  refinementCount: number;
};

function FilterToggle({ showFilter, toggleShowFilter, refinementCount }: FilterToggleProps) {
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

function DesktopRefinementList() {
  return (
    <aside className="relative col-span-2 hidden flex-shrink-0 bg-gray-100 pl-4 lg:block">
      <SimpleBar className="sticky top-0 max-h-screen space-y-4 overflow-y-auto pb-8 pt-3">
        <div className="space-y-4 px-1">
          <RefinementList
            limit={14}
            attribute="categories"
            label="Categories"
            transformItems={(items) => sortBy(items, ['label'])}
          />
          <RangeSlider attribute="target_amount" label="Target Amount (RM)" />
          <ClearRefinementsButton />
        </div>
      </SimpleBar>
    </aside>
  );
}

type MobileRefinementListProps = {
  showFilter: boolean;
  toggleShowFilter: (value: any) => void;
};

function MobileRefinementList({ showFilter, toggleShowFilter }: MobileRefinementListProps) {
  return (
    <div
      className={cn(
        'fixed bottom-0 left-0 z-30 max-h-[350px] w-full overflow-hidden rounded-t-md bg-gray-100 drop-shadow-2xl transition-all duration-150 ease-in-out',
        {
          'visible block translate-y-0 opacity-100 lg:hidden': showFilter,
          'invisible hidden translate-y-5 opacity-0 lg:hidden': !showFilter,
        }
      )}>
      <div className="flex w-full items-center justify-between bg-white text-sm">
        <ClearRefinements className="p-1" />
        <button className="rounded-md px-3 py-2" onClick={toggleShowFilter}>
          Done
        </button>
      </div>
      <SimpleBar className="max-h-[300px] px-1 py-2">
        <div className="grid w-full grid-cols-2 gap-5">
          <div className="shrink-0">
            <RefinementList
              limit={14}
              attribute="categories"
              label="Categories"
              transformItems={(items) => sortBy(items, ['label'])}
            />
          </div>
          <div className="shrink-0">
            <RangeSlider attribute="target_amount" label="Target Amount (RM)" />
          </div>
        </div>
      </SimpleBar>
    </div>
  );
}

type SearchProps = {
  searchClient: any;
  searchState?: any;
  onSearchStateChange?: (searchState: any) => void;
  resultsState?: any;
};

export function Search({
  searchClient,
  searchState,
  onSearchStateChange,
  resultsState,
  ...props
}: SearchProps) {
  const [showFilter, toggleShowFilter] = useToggle(false);

  const refinementCount = get(searchState, 'refinementList.categories', []).length;
  const searchQuery = get(searchState, 'query', '');

  return (
    <div className="relative bg-gray-100">
      <InstantSearch
        indexName="fundraising_campaigns"
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        resultsState={resultsState}
        {...props}>
        <Configure hitsPerPage={9} />
        {!showFilter && (
          <FilterToggle
            showFilter={showFilter}
            toggleShowFilter={toggleShowFilter}
            refinementCount={refinementCount}
          />
        )}
        <div className="mx-auto w-full max-w-screen-xl">
          <div className="relative flex grid-cols-12 gap-3 lg:grid">
            <DesktopRefinementList />
            <MobileRefinementList showFilter={showFilter} toggleShowFilter={toggleShowFilter} />
            <main className="relative col-span-10 w-full bg-gray-50">
              <div className="sticky top-0 z-40 flex w-full items-center border-b border-gray-900 border-opacity-5 bg-white shadow-smooth">
                <SearchBox placeholder="Search Fundraising Campaigns" />
                <div className="flex flex-shrink-0 flex-nowrap items-center space-x-2 border-l border-gray-100">
                  <SortBy
                    className="px-0.5"
                    defaultRefinement="fundraising_campaigns"
                    items={[
                      { value: 'fundraising_campaigns', label: 'Most Relevant' },
                      { value: 'fundraising_campaigns/sort/total_raised_amount:desc', label: 'Most Popular' },
                      { value: 'fundraising_campaigns/sort/total_raised_amount:asc', label: 'Help Needed' },
                      { value: 'fundraising_campaigns/sort/start_datetime:desc', label: 'Just Started' },
                      { value: 'fundraising_campaigns/sort/end_datetime:asc', label: 'Ending Soon' },
                    ]}
                  />
                </div>
              </div>
              <NoSearchResults searchQuery={searchQuery} />
              <Stats searchQuery={searchQuery} />
              <Hits hitComponent={SearchResultCard} />
              <div className="bg-gradient-to-t from-gray-100 pb-16 pt-10">
                <Pagination />
              </div>
            </main>
          </div>
        </div>
      </InstantSearch>
    </div>
  );
}
