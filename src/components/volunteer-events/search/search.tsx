import { SearchResultCard } from './search-result-card';
import {
  DesktopRefinementList,
  FilterToggle,
  GeoSearch,
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
        indexName="volunteer_events"
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
              <RangeSlider attribute="openings" label="Number of Openings" />
            </DesktopRefinementList>
            <MobileRefinementList showFilter={showFilter} toggleShowFilter={toggleShowFilter}>
              <RefinementList
                limit={14}
                attribute="categories"
                label="Categories"
                transformItems={(items) => sortBy(items, ['label'])}
              />
              <RangeSlider attribute="openings" label="Number of Openings" />,
            </MobileRefinementList>
            <main className="relative col-span-10 w-full bg-gray-50">
              <div className="sticky top-0 z-40 flex w-full flex-wrap items-center divide-x-2 divide-gray-100 border-b border-gray-900 border-opacity-5 bg-white shadow-smooth md:flex-nowrap">
                <div className="flex-1 md:w-full md:flex-auto">
                  <SearchBox placeholder="Search volunteer events" />
                </div>
                <div className="order-last w-full border-t-2 pl-1.5 md:order-none md:flex md:w-[630px] md:border-t-0 md:pl-0">
                  <GeoSearch />
                </div>
                <div className="flex flex-shrink-0 flex-nowrap items-center">
                  <SortBy
                    className="p-0.5 hover:bg-gray-50"
                    defaultRefinement="volunteer_events"
                    items={[
                      { value: 'volunteer_events', label: 'Most Relevant' },
                      { value: 'volunteer_events/sort/volunteer_count:desc', label: 'Most Popular' },
                      { value: 'volunteer_events/sort/volunteer_count:asc', label: 'Help Needed' },
                      { value: 'volunteer_events/sort/start_datetime:asc', label: 'Closest Date' },
                      { value: 'volunteer_events/sort/start_datetime:desc', label: 'Furthest Date' },
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
