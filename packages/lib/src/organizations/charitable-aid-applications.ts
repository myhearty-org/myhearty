import { CharitableAidApplication, CharitableAidApplicationStatus } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getCharitableAidApplications(
  charitableAidIdOrSlug: string,
  page?: number,
  perPage?: number
) {
  const { data, headers } = await axiosWithAuth.get(`/aids/${charitableAidIdOrSlug}/aid-applications`, {
    params: {
      page,
      perPage,
    },
  });

  const charitableAidApplications: CharitableAidApplication[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { charitableAidApplications, paginationMetadata };
}

export async function updateCharitableAidApplication(id: number, status: CharitableAidApplicationStatus) {
  const { data } = await axiosWithAuth.patch(`/aid-applications/${id}`, {
    status,
  });
  const charitableAidApplication: CharitableAidApplication = { ...data };

  return charitableAidApplication;
}
