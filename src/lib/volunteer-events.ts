import { VolunteerEvent } from '@lib/types';
import { axios, axiosWithAuth } from '@utils/myhearty-axios';

export async function getVolunteerEvent(idOrSlug: string) {
  const { data } = await axios.get(`/volunteer-events/${idOrSlug}`);
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}

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
