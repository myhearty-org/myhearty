import { axios, axiosWithAuth } from '@utils/myhearty-axios';

export function getFundraisingCampaign(idOrSlug: string) {
  return axios.get(`/campaigns/${idOrSlug}`);
}

export function donateForFundraisingCampaign(id: string, amount: number) {
  return axiosWithAuth.post(`/campaigns/${id}/donate`, {
    amount,
  });
}
