import { VolunteerApplication, VolunteerEvent } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function isVolunteerEventApplied(id: number) {
  const { status } = await axiosWithAuth.get(`/user/volunteer-applications/${id}`, {
    validateStatus: (status) => status === 204 || status === 404,
  });

  return status === 204;
}

export async function applyForVolunteerEvent(id: number) {
  const { data } = await axiosWithAuth.post(`/user/volunteer-applications/${id}`);
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}

export function unapplyForVolunteerEvent(id: number) {
  return axiosWithAuth.delete(`/user/volunteer-applications/${id}`);
}

export async function getVolunteerApplications(page?: number, perPage?: number) {
  const { data, headers } = await axiosWithAuth.get('/user/volunteer-applications', {
    params: {
      page,
      perPage,
    },
  });

  const volunteerApplications: VolunteerApplication[] = data;
  const paginationMetadata = generatePaginationMetadata(headers);

  return { volunteerApplications, paginationMetadata };
}
