import { FundraisingCampaign } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getFundraisingCampaigns(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/org/campaigns', {
    params: {
      page,
      perPage,
    },
  });

  const fundraisingCampaigns: FundraisingCampaign[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { fundraisingCampaigns, paginationMetadata };
}
