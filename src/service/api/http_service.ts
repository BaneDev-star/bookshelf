import axios from "axios";

const API_ROOT = 'http://104.248.26.141:3000/api';

axios.defaults.baseURL = API_ROOT;
axios.defaults.timeout = 120000;
axios.defaults.headers.common['Accept'] = 'application/json';
axios.interceptors.request.use(
  config => config,
  error => Promise.reject(error)
);

axios.interceptors.response.use(
  response => response,
  error => Promise.reject(error.response || error.request || error.message)
);

const http = {
  setAuthorizationHeader(accessToken: string) {
    axios.defaults.headers.Authorization = accessToken;
  },
  request(config = {}) {
    return axios.request(config);
  },
  get(url: string, config = {}) {
    return axios.get(url, config);
  },
  post(url: string, data = {}, config = {}) {
    return axios.post(url, data, config);
  },
  put(url: string, data = {}, config = {}) {
    return axios.put(url, data, config);
  },
  patch(url: string, data = {}, config = {}) {
    return axios.patch(url, data, config);
  },
  delete(url: string, config = {}) {
    return axios.delete(url, config);
  }
};

export default http;
