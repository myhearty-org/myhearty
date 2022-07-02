import { getMetrics } from '@myhearty/lib/organizations';
import useSWR from 'swr';

export function useMetrics(fundraisingCampaignIdOrSlug: string) {
  const key = `/campaigns/${fundraisingCampaignIdOrSlug}/metrics`;

  const { data, error, isValidating, mutate } = useSWR(fundraisingCampaignIdOrSlug ? key : null, () =>
    getMetrics(fundraisingCampaignIdOrSlug)
  );
  const metrics = data;

  return {
    metrics,
    isLoading: (!error && !data) || isValidating,
    mutate,
  };
}
