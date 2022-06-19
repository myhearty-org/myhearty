import { VolunteerEvent } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getVolunteerEvents(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/org/volunteer-events', {
    params: {
      page,
      perPage,
    },
  });

  const volunteerEvents: VolunteerEvent[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { volunteerEvents, paginationMetadata };
}
