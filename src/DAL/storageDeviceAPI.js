import Axios from "axios";

const setToket = (conf) => {
  const token = localStorage.getItem("token");
  const config = { ...conf };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

const baseUrl = "http://localhost:4000/api/storageDeviceSp/";

Axios.interceptors.request.use(setToket);

const storageDeviceAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(storage) {
    return Axios.post(baseUrl, storage);
  },
  update(storage) {
    return Axios.put(baseUrl, storage);
  },
  delete(storage) {
    return Axios.delete(baseUrl, { data: storage });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default storageDeviceAPI;
