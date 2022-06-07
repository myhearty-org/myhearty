import { Member } from '../types';
import { axios } from '@myhearty/utils/myhearty-axios';

export async function logInMember(email: string, password: string) {
  const { data } = await axios.post('/members/login', {
    member: {
      email,
      password,
    },
  });
  const member: Member = { ...data };

  return member;
}

export function logOutMember() {
  return axios.post('/members/logout');
}
