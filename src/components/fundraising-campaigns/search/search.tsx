import { SearchResultCard } from './search-result-card';
import {
  DesktopRefinementList,
  FilterToggle,
  Hits,
  MobileRefinementList,
  NoSearchResults,
  Pagination,
  RangeSlider,
  RefinementList,
  SearchBox,
  Stats,
} from '@components/search';
import get from 'lodash/get';
import sortBy from 'lodash/sortBy';
import { Configure, InstantSearch, SortBy } from 'react-instantsearch-dom';
import { useToggle } from 'react-use';

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
            <DesktopRefinementList>
              <RefinementList
                limit={14}
                attribute="categories"
                label="Categories"
                transformItems={(items) => sortBy(items, ['label'])}
              />
              <RangeSlider attribute="target_amount" label="Target Amount (RM)" />
            </DesktopRefinementList>
            <MobileRefinementList showFilter={showFilter} toggleShowFilter={toggleShowFilter}>
              <RefinementList
                limit={14}
                attribute="categories"
                label="Categories"
                transformItems={(items) => sortBy(items, ['label'])}
              />
              <RangeSlider attribute="target_amount" label="Target Amount (RM)" />
            </MobileRefinementList>
            <main className="relative col-span-10 w-full bg-gray-50">
              <div className="sticky top-0 z-40 flex w-full items-center divide-x-2 divide-gray-100 border-b border-gray-900 border-opacity-5 bg-white shadow-smooth">
                <SearchBox placeholder="Search fundraising campaigns" />
                <div className="flex flex-shrink-0 flex-nowrap items-center">
                  <SortBy
                    className="p-0.5 hover:bg-gray-50"
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
