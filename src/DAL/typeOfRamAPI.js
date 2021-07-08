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

const baseUrl = "http://localhost:4000/api/socketRam/";

Axios.interceptors.request.use(setToken);

const typeOfRamAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(typeOfRam) {
    return Axios.post(baseUrl, typeOfRam);
  },
  update(typeOfRam) {
    return Axios.put(baseUrl, typeOfRam);
  },
  delete(socket) {
    return Axios.delete(baseUrl, { data: socket });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default typeOfRamAPI;
