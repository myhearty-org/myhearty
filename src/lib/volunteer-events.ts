import { axios, axiosWithAuth } from '@utils/myhearty-axios';

export function getVolunteerEvent(idOrSlug: string) {
  return axios.get(`/volunteer-events/${idOrSlug}`);
}

export function checkVolunteerApplication(id: string) {
  return axiosWithAuth.get(`/user/volunteer-applications/${id}`);
}

export function applyForVolunteerEvent(id: string) {
  return axiosWithAuth.post(`/user/volunteer-applications/${id}`);
}

export function unapplyForVolunteerEvent(id: string) {
  return axiosWithAuth.delete(`/user/volunteer-applications/${id}`);
}
