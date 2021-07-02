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

const baseUrl = "http://localhost:4000/api/vendors/";

Axios.interceptors.request.use(setToken);

// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/vendors/",
//   withCredentials: true,
//   headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
// });

const vendorAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
    // return instance.get(`?page=${page}&text=${text}`);
  },
  update(vendor) {
    return Axios.put(baseUrl, vendor);
  },
  delete(vendor) {
    return Axios.delete(baseUrl, { data: vendor });
  },
  add(vendor) {
    return Axios.post(baseUrl, vendor);
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
  searchItem(text) {
    return Axios.post(`${baseUrl}searchItem`, text);
  },
};

export default vendorAPI;
