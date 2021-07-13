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

const baseUrl = "http://localhost:4000/api/mboard/";

Axios.interceptors.request.use(setToken);

// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/mboard",
//   withCredentials: true,
// });

const mboardAPI = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(mBoard) {
    return Axios.post(baseUrl, mBoard);
  },
  update(mBoard) {
    return Axios.put(baseUrl, mBoard);
  },
  delete(mBoard) {
    return Axios.delete(baseUrl, { data: mBoard });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default mboardAPI;
