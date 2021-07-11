/* eslint-disable no-param-reassign */
import Axios from "axios";

const setToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

const baseUrl = "http://localhost:4000/api/cpus";

Axios.interceptors.request.use(setToken);

const cpuAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  update(cpu) {
    return Axios.put(baseUrl, cpu);
  },
  delete(cpu) {
    return Axios.delete(baseUrl, { data: cpu });
  },
  add(cpu) {
    return Axios.post(baseUrl, cpu);
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default cpuAPI;
