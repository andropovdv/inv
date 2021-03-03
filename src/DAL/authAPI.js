import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/auth/",
  withCredentials: true,
});

export const authAPI = {
  me() {
    return instance.get("me");
  },
  login(email, pass) {
    return instance.post("login", { email, pass });
  },
  logout() {
    return instance.post("logout");
  },
};

export default authAPI;
