import { Donation } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function donateForFundraisingCampaign(id: string, amount: number) {
  const { data } = await axiosWithAuth.post(`/campaigns/${id}/donate`, {
    amount,
  });

  return data.stripeCheckoutUrl;
}

export async function getDonations() {
  const { data, headers } = await axiosWithAuth.get('/user/donations');

  const donations: Donation[] = data;
  const pagination = generatePaginationMetadata(headers);

  return { donations, pagination };
}
