import { FundraisingCampaign } from './types';
import { axios } from '@myhearty/utils/myhearty-axios';

export async function getFundraisingCampaign(idOrSlug: string) {
  const { data } = await axios.get(`/campaigns/${idOrSlug}`);
  const fundraisingCampaign: FundraisingCampaign = { ...data };

  return fundraisingCampaign;
}
