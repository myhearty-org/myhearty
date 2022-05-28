import { CharitableAid } from '../types';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function isCharitableAidApplied(id: string) {
  const { status } = await axiosWithAuth.get(`/user/aid-applications/${id}`, {
    validateStatus: (status) => status === 204 || status === 404,
  });

  return status === 204;
}

export async function applyForCharitableAid(id: string, reason: string) {
  const { data } = await axiosWithAuth.post(`/user/aid-applications/${id}`, {
    reason,
  });
  const charitableAid: CharitableAid = { ...data };

  return charitableAid;
}

export function unapplyForCharitableAid(id: string) {
  return axiosWithAuth.delete(`/user/aid-applications/${id}`);
}
