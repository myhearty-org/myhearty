import { getCharitableAids } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useCharitableAids(perPage = 12) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/aids?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(key, () => getCharitableAids(pageIndex, perPage));
  const { charitableAids, paginationMetadata } = data ?? { charitableAids: [] };

  return {
    charitableAids,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
