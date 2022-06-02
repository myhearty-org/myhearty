import { VolunteerApplication, VolunteerEvent } from '../types';
import { generatePaginationMetadata } from '@myhearty/utils/api';
import { axiosWithAuth } from '@myhearty/utils/myhearty-axios';

export async function isVolunteerEventApplied(id: string) {
  const { status } = await axiosWithAuth.get(`/user/volunteer-applications/${id}`, {
    validateStatus: (status) => status === 204 || status === 404,
  });

  return status === 204;
}

export async function applyForVolunteerEvent(id: string) {
  const { data } = await axiosWithAuth.post(`/user/volunteer-applications/${id}`);
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}

export function unapplyForVolunteerEvent(id: string) {
  return axiosWithAuth.delete(`/user/volunteer-applications/${id}`);
}

export async function getVolunteerApplications() {
  const { data, headers } = await axiosWithAuth.get('/user/volunteer-applications');

  const volunteerApplications: VolunteerApplication[] = data;
  const pagination = generatePaginationMetadata(headers);

  return { volunteerApplications, pagination };
}
