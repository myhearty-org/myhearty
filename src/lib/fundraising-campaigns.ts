import { axios, axiosWithAuth } from '@utils/myhearty-axios';
import { FundraisingCampaign } from '@lib/types';

export async function getFundraisingCampaign(idOrSlug: string) {
  const { data } = await axios.get(`/campaigns/${idOrSlug}`);
  const fundraisingCampaign: FundraisingCampaign = { ...data };

  return fundraisingCampaign;
}

export async function donateForFundraisingCampaign(id: string, amount: number) {
  const { data } = await axiosWithAuth.post(`/campaigns/${id}/donate`, {
    amount,
  });

  return data.stripeCheckoutUrl;
}
