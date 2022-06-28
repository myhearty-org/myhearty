import { Donation } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getDonations(fundraisingCampaignIdOrSlug: string, page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get(`/campaigns/${fundraisingCampaignIdOrSlug}/donations`, {
    params: {
      page,
      perPage,
    },
  });

  const donations: Donation[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { donations, paginationMetadata };
}
