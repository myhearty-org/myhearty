import { CharitableAid } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getCharitableAids(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/org/aids', {
    params: {
      page,
      perPage,
    },
  });

  const charitableAids: CharitableAid[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { charitableAids, paginationMetadata };
}
