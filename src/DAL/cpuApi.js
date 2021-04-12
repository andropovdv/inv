import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/cpus",
  withCredentials: true,
});

const cpuAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  update(cpu) {
    return instance.put("/update", cpu);
  },
  delete(id) {
    return instance.post(`/delete`, id);
  },
  add(cpu) {
    return instance.post("/add", cpu);
  },
  searchItem(text, page) {
    return instance.get(`/searchItem?page=${page}&text=${text}`);
  },
};

export default cpuAPI;
