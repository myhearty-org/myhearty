import { CharitableAid, CharitableAidApplication } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function isCharitableAidApplied(id: number) {
  const { status } = await axiosWithAuth.get(`/user/aid-applications/${id}`, {
    validateStatus: (status) => status === 204 || status === 404,
  });

  return status === 204;
}

export async function applyForCharitableAid(id: number, reason: string) {
  const { data } = await axiosWithAuth.post(`/user/aid-applications/${id}`, {
    reason,
  });
  const charitableAid: CharitableAid = { ...data };

  return charitableAid;
}

export function unapplyForCharitableAid(id: number) {
  return axiosWithAuth.delete(`/user/aid-applications/${id}`);
}

export async function getCharitableAidApplications(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/user/aid-applications', {
    params: {
      page,
      perPage,
    },
  });

  const charitableAidApplications: CharitableAidApplication[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { charitableAidApplications, paginationMetadata };
}
