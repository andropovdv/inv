import Axios from "axios";

const setToken = (conf) => {
  const config = { ...conf };
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

const baseUrl = "http://localhost:4000/api/socketSD/";

Axios.interceptors.request.use(setToken);

const socketSdAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  update(socketSd) {
    return Axios.put(baseUrl, socketSd);
  },
  delete(socketSd) {
    return Axios.delete(baseUrl, { data: socketSd });
  },
  add(socketSd) {
    return Axios.post(baseUrl, socketSd);
  },
  alltoScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default socketSdAPI;
