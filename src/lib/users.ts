import { axios } from '@utils/myhearty-axios';

export function signUpUser(email: string, password: string) {
  return axios.post('/users/signup', {
    user: {
      email,
      password,
    },
  });
}

export function logInUser(email: string, password: string) {
  return axios.post('/users/login', {
    user: {
      email,
      password,
    },
  });
}

export function logOutUser() {
  return axios.post('/users/logout');
}
