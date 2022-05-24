import axios from 'axios';

axios.defaults.baseURL = process.env.NEXT_PUBLIC_API_URL;

axios.defaults.xsrfCookieName = 'X-CSRF-Token';

axios.defaults.xsrfHeaderName = 'X-CSRF-Token';

axios.defaults.withCredentials = true;

axios.defaults.headers.post['Content-Type'] = 'application/json';
axios.defaults.headers.put['Content-Type'] = 'application/json';
axios.defaults.headers.patch['Content-Type'] = 'application/json';

axios.defaults.headers.get['Accept'] = 'application/json';
axios.defaults.headers.post['Accept'] = 'application/json';
axios.defaults.headers.put['Accept'] = 'application/json';
axios.defaults.headers.patch['Accept'] = 'application/json';
axios.defaults.headers.delete['Accept'] = 'application/json';

const defaultAxios = axios.create();
const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      window.localStorage.removeItem('user')
      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);

export { defaultAxios as axios, axiosWithAuth };
