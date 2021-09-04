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

const baseUrl = "http://localhost:4000/api/formFactorSD/";

Axios.interceptors.request.use(setToken);

const formFactorSdAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  update(formFactorSD) {
    return Axios.put(baseUrl, formFactorSD);
  },
  delete(formFactorSD) {
    return Axios.delete(baseUrl, { data: formFactorSD });
  },
  add(formFactorSD) {
    return Axios.post(baseUrl, formFactorSD);
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default formFactorSdAPI;
