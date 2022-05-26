import { VolunteerEvent } from './types';
import { axios } from '@myhearty/utils/myhearty-axios';

export async function getVolunteerEvent(idOrSlug: string) {
  const { data } = await axios.get(`/volunteer-events/${idOrSlug}`);
  const volunteerEvent: VolunteerEvent = { ...data };

  return volunteerEvent;
}
