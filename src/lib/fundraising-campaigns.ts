import { axios } from '@utils/myhearty-axios';
import { FundraisingCampaign } from '@lib/types';

export async function getFundraisingCampaign(idOrSlug: string) {
  const { data } = await axios.get(`/campaigns/${idOrSlug}`);
  const fundraisingCampaign: FundraisingCampaign = { ...data };

  return fundraisingCampaign;
}
