import { User } from '../types';
import { axios } from '@myhearty/utils/myhearty-axios';

export function signUpUser(email: string, password: string) {
  return axios.post('/users/signup', {
    user: {
      email,
      password,
    },
  });
}

export async function logInUser(email: string, password: string) {
  const { data } = await axios.post('/users/login', {
    user: {
      email,
      password,
    },
  });
  const user: User = { ...data };

  return user;
}

export function logOutUser() {
  return axios.post('/users/logout');
}
