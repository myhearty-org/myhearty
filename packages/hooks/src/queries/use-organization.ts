import { getAuthenticatedOrganization } from '@myhearty/lib/organizations';
import useSWRImmutable from 'swr/immutable';

export function useOrganization() {
  const key = `/org`;

  const { data, error, isValidating, mutate } = useSWRImmutable(key, () => getAuthenticatedOrganization());
  const organization = data;

  return {
    organization,
    isLoading: (!error && !data) || isValidating,
    mutate,
  };
}
