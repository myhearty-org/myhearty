import { getDonations } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useDonations(fundraisingCampaignIdOrSlug: string) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/campaigns/${fundraisingCampaignIdOrSlug}/donations?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(fundraisingCampaignIdOrSlug ? key : null, () =>
    getDonations(fundraisingCampaignIdOrSlug, pageIndex)
  );
  const { donations, paginationMetadata } = data ?? { donations: [] };

  return {
    donations,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
