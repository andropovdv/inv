import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/socketCpu",
  withCredentials: true,
});

const typeSocketCpuAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
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
  searchItem(text) {
    return instance.post("searchItem", text);
  },
};

export default typeSocketCpuAPI;
