import { Search } from '@components/volunteer-events';
import { TYPESENSE_CONFIG } from '@lib/config';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import { useState } from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesense = new TypesenseInstantSearchAdapter({
  server: TYPESENSE_CONFIG,
  geoLocationField: 'coordinates',
  additionalSearchParameters: {
    query_by: 'name,organization,location',
    queryByWeights: '2,1,2',
  },
});

const searchClient = typesense.searchClient;

type VolunteerEventsSearchPageProps = {
  resultsState: any;
};

export default function VolunteerEventsSearchPage({ resultsState }: VolunteerEventsSearchPageProps) {
  const [searchState, setSearchState] = useState({});

  function onSearchStateChange(searchState: any) {
    setSearchState(searchState);
  }

  return (
    <div className="flex-grow">
      <NextSeo title="Search Volunteer Events" />
      <Search
        searchClient={searchClient}
        searchState={searchState}
        onSearchStateChange={onSearchStateChange}
        resultsState={resultsState}
      />
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = async function ({ res }) {
  res.setHeader('Cache-Control', `s-maxage=${1 * 60 * 60}, stale-while-revalidate=${24 * 60 * 60}`);

  const resultsState = await findResultsState(Search, {
    indexName: 'volunteer_events',
    searchClient: searchClient,
  });

  return {
    props: {
      resultsState: JSON.parse(JSON.stringify(resultsState)),
    },
  };
};
