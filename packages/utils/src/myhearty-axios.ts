import { camelizeObject, snakeizeObject } from './case-converter';
import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';
import camelizeString from 'lodash/camelCase';

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

const axiosWithoutInterceptors = axios.create();

function snakeizeConfig(config: AxiosRequestConfig) {
  config.params = snakeizeObject(config.params);
  config.data = snakeizeObject(config.data);

  return config;
}

function camelizeResponse(response: AxiosResponse) {
  response.data = camelizeObject(response.data);

  return response;
}

function camelizeError(error: any) {
  if (error.response?.data?.code) {
    error.response.data.code = camelizeString(error.response.data.code);
  }

  if (error.response?.data?.errors) {
    error.response.data.errors = error.response.data.errors.map((error: any) => {
      error.field = camelizeString(error.field);
      error.code = camelizeString(error.code);

      return error;
    });
  }

  return error;
}

const defaultAxios = axios.create();

defaultAxios.interceptors.request.use(
  function (config) {
    return snakeizeConfig(config);
  },
  function (error) {
    return Promise.reject(error);
  }
);

defaultAxios.interceptors.response.use(
  function (response) {
    return camelizeResponse(response);
  },
  function (error) {
    error = camelizeError(error);
    return Promise.reject(error);
  }
);

const axiosWithAuth = axios.create();

axiosWithAuth.interceptors.request.use(
  function (config) {
    return snakeizeConfig(config);
  },
  function (error) {
    return Promise.reject(error);
  }
);

axiosWithAuth.interceptors.response.use(
  function (response) {
    return camelizeResponse(response);
  },
  function (error) {
    if (error.response.status === 401 || error.response.status === 403) {
      window.localStorage.removeItem('user');
      window.location.href = '/login';
    } else {
      error = camelizeError(error);
    }

    return Promise.reject(error);
  }
);

export { axiosWithoutInterceptors, defaultAxios as axios, axiosWithAuth };
