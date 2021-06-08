import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/mboard",
  withCredentials: true,
});

const mboardAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  add(mBoard) {
    return instance.post("/add", mBoard);
  },
  update(mBoard) {
    return instance.put("/update", mBoard);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default mboardAPI;
