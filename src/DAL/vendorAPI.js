import Axios from "axios";

const instance = Axios.create({
  baseURL: "http://localhost:4000/api/vendors/",
  withCredentials: true,
});

const vendorAPI = {
  all(page, text) {
    return instance.get(`?page=${page}&text=${text}`);
  },
  update(vendor) {
    return instance.put("update", vendor);
  },
  delete(vendor) {
    return instance.post("delete", vendor);
  },
  add(vendor) {
    return instance.post("add", vendor);
  },
  allToScroll() {
    return instance.get("all");
  },
  searchItem(text) {
    return instance.post("searchItem", text);
  },
};

export default vendorAPI;
