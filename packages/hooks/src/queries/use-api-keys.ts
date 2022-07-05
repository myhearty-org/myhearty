import { getApiKeys } from '@myhearty/lib/organizations';
import useSWR from 'swr';

export function useApiKeys() {
  const key = '/org/api-keys';

  const { data, error, isValidating, mutate } = useSWR(key, () => getApiKeys());
  const apiKeys = data ?? [];

  return {
    apiKeys,
    isLoading: (!error && !data) || isValidating,
    mutate,
  };
}
