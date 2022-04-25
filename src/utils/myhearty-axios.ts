import axios from 'axios';

axios.defaults.baseURL = 'https://api.myhearty.my';

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

export { axios };
