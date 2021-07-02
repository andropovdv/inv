import Axios from "axios";

const setToken = (conf) => {
  const token = localStorage.getItem("token");
  const config = { ...conf };
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    delete config.headers.Authorization;
  }
  return config;
};

Axios.interceptors.request.use(setToken);

const baseUrl = "http://localhost:4000/api/socketCpu";

const typeSocketCpuAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  update(typeSocket) {
    return Axios.put(baseUrl, typeSocket);
  },
  add(typeSocket) {
    return Axios.post(baseUrl, typeSocket);
  },
  delete(id) {
    return Axios.delete(baseUrl, { data: id });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}/all`);
  },
  searchItem(text) {
    return Axios.post("searchItem", text);
  },
};

export default typeSocketCpuAPI;
