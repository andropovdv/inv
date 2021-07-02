import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/auth4/",
  withCredentials: true,
});

export const authNoKeyAPI = {
  login(email, pass) {
    return instance.post("/", { email, pass });
  },
};

export default authNoKeyAPI;
