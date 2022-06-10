import { Organization, CreateOrganization } from '../types';
import { axios, axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export function signUpOrganization(payload: CreateOrganization) {
  return axios.post('/org', payload);
}

export async function getAuthenticatedOrganization() {
  const { data } = await axiosWithAuth.get('/org');
  const organization: Organization = { ...data };

  return organization;
}
