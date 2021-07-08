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

const baseUrl = "http://localhost:4000/api/formFactor/";

Axios.interceptors.request.use(setToken);

// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/formFactor",
//   withCredentials: true,
// });

const formFactorAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(formFactor) {
    return Axios.post(baseUrl, formFactor);
  },
  update(formFactor) {
    return Axios.put(baseUrl, formFactor);
  },
  delete(factor) {
    return Axios.delete(baseUrl, { data: factor });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default formFactorAPI;
