import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/socketGraph",
  withCredentials: true,
});

const typeOfGraphSlotAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  add(typeOfGraphSlot) {
    return instance.post("/", typeOfGraphSlot);
  },
  update(typeOfGraphSlot) {
    return instance.put("/", typeOfGraphSlot);
  },
  delete(id) {
    return instance.delete(`/${id}`);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default typeOfGraphSlotAPI;
