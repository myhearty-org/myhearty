import { CreateOrganization } from '../types';
import { axios } from '@myhearty/utils/myhearty-axios';

export function signUpOrganization(payload: CreateOrganization) {
  return axios.post('/org', payload);
}
