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
    return instance.post("/add", typeOfGraphSlot);
  },
  update(typeOfGraphSlot) {
    return instance.put("/update", typeOfGraphSlot);
  },
  delete(id) {
    return instance.post("/delete", id);
  },
  allToScroll() {
    return instance.get("/all");
  },
};

export default typeOfGraphSlotAPI;
