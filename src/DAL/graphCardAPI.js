import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/GraphCard",
  withCredentials: true,
});

const graphCardApi = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  add(graphCard) {
    return instance.post("/add", graphCard);
  },
  update(graphCard) {
    return instance.put("/update", graphCard);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default graphCardApi;
