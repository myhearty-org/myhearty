import { CreateOrganization, Organization } from '../types';
import { axios, axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export function signUpOrganization(payload: CreateOrganization) {
  return axios.post('/org', payload);
}

export async function createStripeAccountLink() {
  const { data } = await axiosWithAuth.post('/org/stripe-onboard');

  return data.stripeAccountLinkUrl;
}

export async function getAuthenticatedOrganization() {
  const { data } = await axiosWithAuth.get('/org');
  const organization: Organization = { ...data };

  return organization;
}
