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

const baseUrl = "http://localhost:4000/api/GraphCard/";

Axios.interceptors.request.use(setToken);

// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/GraphCard",
//   withCredentials: true,
// });

const graphCardApi = {
  all(page, text) {
    return Axios.get(`${baseUrl}?page=${page}&text=${text}`);
  },
  add(graphCard) {
    return Axios.post(baseUrl, graphCard);
  },
  update(graphCard) {
    return Axios.put(baseUrl, graphCard);
  },
  delete(graphCard) {
    return Axios.delete(baseUrl, { data: graphCard });
  },
  allToScroll() {
    return Axios.get(`${baseUrl}all`);
  },
};

export default graphCardApi;
