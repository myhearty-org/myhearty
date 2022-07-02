import { VolunteerApplication, VolunteerApplicationAttendance, VolunteerApplicationStatus } from '../types';
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

export async function updateVolunteerApplication(
  id: number,
  status: VolunteerApplicationStatus,
  attendance: VolunteerApplicationAttendance
) {
  const { data } = await axiosWithAuth.patch(`/volunteer-applications/${id}`, {
    status,
    attendance,
  });
  const volunteerApplication: VolunteerApplication = { ...data };

  return volunteerApplication;
}
