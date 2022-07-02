import { CreateFundraisingCampaign, FundraisingCampaign, Metrics, UpdateFundraisingCampaign } from '../types';
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

export async function createFundraisingCampaign(payload: CreateFundraisingCampaign) {
  const { data } = await axiosWithAuth.post('/campaigns', payload);
  const fundraisingCampaign: FundraisingCampaign = { ...data };

  return fundraisingCampaign;
}

export async function updateFundraisingCampaign(idOrSlug: string, payload: UpdateFundraisingCampaign) {
  const { data } = await axiosWithAuth.patch(`/campaigns/${idOrSlug}`, {
    ...payload,
  });
  const fundraisingCampaign: FundraisingCampaign = { ...data };

  return fundraisingCampaign;
}

export async function deleteFundraisingCampaign(id: number) {
  return axiosWithAuth.delete(`/campaigns/${id}`);
}

export async function getMetrics(fundraisingCampaignIdOrSlug: string) {
  const { data } = await axiosWithAuth.get(`/campaigns/${fundraisingCampaignIdOrSlug}/metrics`);
  const metrics: Metrics = { ...data };

  return metrics;
}
