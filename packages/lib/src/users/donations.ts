import { Donation } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function donateForFundraisingCampaign(id: string, amount: number) {
  const { data } = await axiosWithAuth.post(`/campaigns/${id}/donate`, {
    amount,
  });

  return data.stripeCheckoutUrl;
}

export async function getDonations(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/user/donations', {
    params: {
      page,
      perPage,
    },
  });

  const donations: Donation[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { donations, paginationMetadata };
}
