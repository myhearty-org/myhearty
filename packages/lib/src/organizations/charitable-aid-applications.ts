import { CharitableAidApplication } from '../types';
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
