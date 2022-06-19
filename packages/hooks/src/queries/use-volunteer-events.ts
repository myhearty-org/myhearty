import { getVolunteerEvents } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useVolunteerEvents(perPage = 12) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/volunteer-events?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(key, () => getVolunteerEvents(pageIndex, perPage));
  const { volunteerEvents, paginationMetadata } = data ?? { volunteerEvents: [] };

  return {
    volunteerEvents,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
