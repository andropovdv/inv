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
const baseUrl = "http://localhost:4000/api/auth4/";

Axios.interceptors.request.use(setToken);

// const instance = Axios.create({
//   baseURL: "http://localhost:4000/api/auth4/",
//   withCredentials: true,
//   headers: { Authorization: `Bearer ${keyToken}` },
// });

export const authAPI = {
  me() {
    if (!localStorage.getItem("token")) {
      return null;
    }
    return Axios.get(baseUrl);
  },
  login(email, pass) {
    return Axios.post(baseUrl, { email, pass });
  },
  logout() {
    return Axios.delete(baseUrl);
  },
};

export default authAPI;
