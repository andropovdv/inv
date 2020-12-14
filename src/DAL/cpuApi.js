import Axios from 'axios';

// const instance = Axios.create({
//     baseURL: 'http://localhost:4000/cpus',
//     withCredentials: true
// })
const instance = Axios.create({
    baseURL: 'http://localhost:4000/v2/cpus',
    withCredentials: true
})


const cpuAPI = {
    all(page) {
        return instance.get(`?page=${page}`);
    },
    update(cpu) {
        return instance.post('/update', cpu)
    },
    delete(id) {
        return instance.post(`/delete`, id)
    },
    add(cpu) {
        return instance.post('/add', cpu)
    }
}

export default cpuAPI;