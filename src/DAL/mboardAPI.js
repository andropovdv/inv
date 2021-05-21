import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/mboard",
  withCredentials: true,
});

const mboardAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  add(formFactor) {
    return instance.post("/add", formFactor);
  },
  update(formFactor) {
    return instance.put("/update", formFactor);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default mboardAPI;
