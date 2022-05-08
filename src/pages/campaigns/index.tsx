import { Search } from '@components/fundraising-campaigns';
import { TYPESENSE_SERVER_CONFIG } from '@lib/config';
import { NextSeo } from 'next-seo';
import { GetServerSideProps } from 'next/types';
import { useState } from 'react';
import { findResultsState } from 'react-instantsearch-dom/server';
import TypesenseInstantSearchAdapter from 'typesense-instantsearch-adapter';

const typesense = new TypesenseInstantSearchAdapter({
  server: TYPESENSE_SERVER_CONFIG,
  additionalSearchParameters: {
    query_by: 'name,organization,about_campaign',
    queryByWeights: '2,2,1',
  },
});

const searchClient = typesense.searchClient;

type FundraisingCampaignsSearchPageProps = {
  resultsState: any;
};

export default function FundraisingCampaignsSearchPage({ resultsState }: FundraisingCampaignsSearchPageProps) {
  const [searchState, setSearchState] = useState({});

  function onSearchStateChange(searchState: any) {
    setSearchState(searchState);
  }

  return (
    <div className="flex-grow">
      <NextSeo title="Search Fundraising Campaigns" />
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
    indexName: 'fundraising_campaigns',
    searchClient: searchClient,
  });

  return {
    props: {
      resultsState: JSON.parse(JSON.stringify(resultsState)),
    },
  };
};
