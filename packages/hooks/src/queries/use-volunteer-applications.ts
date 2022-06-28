import { getVolunteerApplications } from '@myhearty/lib/organizations';
import { useState } from 'react';
import useSWR from 'swr';

export function useVolunteerApplications(volunteerEventIdOrSlug: string) {
  const [pageIndex, setPageIndex] = useState(1);
  const key = `/volunteer-events/${volunteerEventIdOrSlug}/volunteer-applications?page=${pageIndex}`;

  const { data, error, isValidating, mutate } = useSWR(volunteerEventIdOrSlug ? key : null, () =>
    getVolunteerApplications(volunteerEventIdOrSlug, pageIndex)
  );
  const { volunteerApplications, paginationMetadata } = data ?? { volunteerApplications: [] };

  return {
    volunteerApplications,
    isLoading: (!error && !data) || isValidating,
    mutate,
    paginationMetadata,
    pageIndex,
    setPageIndex,
  };
}
