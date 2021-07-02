import Axios from "axios";

const keyToken = localStorage.getItem("token");

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/auth4/",
  withCredentials: true,
  headers: { Authorization: `Bearer ${keyToken}` },
});

export const authAPI = {
  me() {
    if (!localStorage.getItem("token")) {
      return null;
    }
    return instance.get("/");
  },
  login(email, pass) {
    return instance.post("/", { email, pass });
  },
  logout() {
    return instance.delete("/");
  },
};

export default authAPI;
