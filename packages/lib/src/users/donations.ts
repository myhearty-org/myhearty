import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function donateForFundraisingCampaign(id: string, amount: number) {
  const { data } = await axiosWithAuth.post(`/campaigns/${id}/donate`, {
    amount,
  });

  return data.stripeCheckoutUrl;
}
