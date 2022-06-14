import { getMembers } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useMembers() {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/members?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(key, () => getMembers(pageIndex));
  const { members, paginationMetadata } = data ?? { members: [] };

  return {
    members,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
