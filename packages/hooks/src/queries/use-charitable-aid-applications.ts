import { getCharitableAidApplications } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useCharitableAidApplications(charitableAidIdOrSlug: string) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/aids/${charitableAidIdOrSlug}/aid-applications?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(charitableAidIdOrSlug ? key : null, () =>
    getCharitableAidApplications(charitableAidIdOrSlug, pageIndex)
  );
  const { charitableAidApplications, paginationMetadata } = data ?? { charitableAidApplications: [] };

  return {
    charitableAidApplications,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
