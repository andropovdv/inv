import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:4000/vendors/',
    withCredentials: true
});

const vendorAPI = {
    all() {
        return instance.get('');
    }
}

export default vendorAPI;