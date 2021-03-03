import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/v2/typeSocketCpu",
  withCredentials: true,
});

const typeSocketCpuAPI = {
  all(page) {
    return instance.get(`?page=${page}`);
  },
  update(typeSocket) {
    return instance.put("/update", typeSocket);
  },
  add(typeSocket) {
    return instance.post("/add", typeSocket);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default typeSocketCpuAPI;
