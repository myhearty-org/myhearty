import { getVolunteerEvents } from '@myhearty/lib/organizations';
import { getVolunteerEvent } from '@myhearty/lib/volunteer-events';
import { useState } from 'react';
import useSWR from 'swr';

export function useVolunteerEvent(idOrSlug: string) {
  const key = `/volunteer-events/${idOrSlug}`;

  const { data, error, isValidating, mutate } = useSWR(idOrSlug ? key : null, () =>
    getVolunteerEvent(idOrSlug)
  );
  const volunteerEvent = data;

  return {
    volunteerEvent,
    isLoading: (!error && !data) || isValidating,
    mutate,
  };
}

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
