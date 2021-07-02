/* eslint-disable no-param-reassign */
import axios from "axios";

const setToken = (config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

axios.interceptors.request.use(setToken);

export const authIn = {
  me() {
    // axios.interceptors.request.use(setToken);
    return axios.get("http://localhost:4000/api/auth4/");
  },
};

export default authIn;
