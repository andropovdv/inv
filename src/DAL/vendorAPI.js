import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:4000/vendors/',
    withCredentials: true
});

const instanceV2 = Axios.create({
    baseURL: 'http://localhost:4000/v2/vendors/',
    withCredentials: true
});

const vendorAPI = {
    all(page) {
        return instanceV2.get(`?page=${page}`);
    },
    update(vendor) {
        return instance.put('update', vendor)
    },
    delete(vendor) {
        return instance.post('delete', vendor)
    },
    add(vendor) {
        return instance.post('add', vendor)
    },
    allToScroll() {
        return instanceV2.get('all');
    }
}

export default vendorAPI;