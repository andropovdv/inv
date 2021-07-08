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

const baseUrl = "http://localhost:4000/api/socketGraph/";

Axios.interceptors.request.use(setToken);
// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/socketGraph",
//   withCredentials: true,
// });

const typeOfGraphSlotAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(typeOfGraphSlot) {
    return Axios.post(baseUrl, typeOfGraphSlot);
  },
  update(typeOfGraphSlot) {
    return Axios.put(baseUrl, typeOfGraphSlot);
  },
  delete(socket) {
    return Axios.delete(baseUrl, { data: socket });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default typeOfGraphSlotAPI;
