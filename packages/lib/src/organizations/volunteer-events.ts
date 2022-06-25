import { CreateVolunteerEvent, UpdateVolunteerEvent, VolunteerEvent } from '../types';
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

export async function createVolunteerEvent(payload: CreateVolunteerEvent) {
  const { data } = await axiosWithAuth.post('/volunteer-events', payload);
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}

export async function updateVolunteerEvent(idOrSlug: string, payload: UpdateVolunteerEvent) {
  const { data } = await axiosWithAuth.patch(`/volunteer-events/${idOrSlug}`, {
    ...payload,
  });
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}

export async function deleteVolunteerEvent(id: number) {
  return axiosWithAuth.delete(`/volunteer-events/${id}`);
}
