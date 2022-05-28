import { CharitableAid } from './types';
import { axios } from '@myhearty/utils/myhearty-axios';

export async function getCharitableAid(idOrSlug: string) {
  const { data } = await axios.get(`/aids/${idOrSlug}`);
  const charitableAid: CharitableAid = { ...data };

  return charitableAid;
}
