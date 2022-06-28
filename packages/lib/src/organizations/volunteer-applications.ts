import { VolunteerApplication } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function getVolunteerApplications(
  volunteerEventIdOrSlug: string,
  page?: number,
  perPage?: number
) {
  const { data, headers } = await axiosWithAuth.get(
    `/volunteer-events/${volunteerEventIdOrSlug}/volunteer-applications`,
    {
      params: {
        page,
        perPage,
      },
    }
  );

  const volunteerApplications: VolunteerApplication[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { volunteerApplications, paginationMetadata };
}
