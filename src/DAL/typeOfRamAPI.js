import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/socketRam",
  withCredentials: true,
});

const typeOfRamAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  add(typeOfRam) {
    return instance.post("/add", typeOfRam);
  },
  update(typeOfRam) {
    return instance.put("/update", typeOfRam);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default typeOfRamAPI;
