import { getFundraisingCampaign } from '@myhearty/lib/fundraising-campaigns';
import { getFundraisingCampaigns } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useFundraisingCampaign(idOrSlug: string) {
  const key = `/campaigns/${idOrSlug}`;

  const { data, error, isValidating, mutate } = useSWR(idOrSlug ? key : null, () =>
    getFundraisingCampaign(idOrSlug)
  );
  const fundraisingCampaign = data;

  return {
    fundraisingCampaign,
    isLoading: (!error && !data) || isValidating,
    mutate,
  };
}

export function useFundraisingCampaigns(perPage = 12) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/campaigns?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(key, () =>
    getFundraisingCampaigns(pageIndex, perPage)
  );
  const { fundraisingCampaigns, paginationMetadata } = data ?? { fundraisingCampaigns: [] };

  return {
    fundraisingCampaigns,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
