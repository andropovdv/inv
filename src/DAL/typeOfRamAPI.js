import Axios from 'axios';

const instance = Axios.create({
    baseURL: "http://localhost:4000/v2/typeOfRam",
    withCredentials: true
})

const typeOfRam = {
    all(page) {
        return instance.get(`?page=${page}`)
    },
    add(typeOfRam) {
        return instance.post('/', typeOfRam)
    },
    update(typeOfRam) {
        return instance.put('/', typeOfRam)
    },
    delete(id) {
        return instance.delete(`/${id}`)
    },
    allToScroll() {
        return instance.get('/all')
    }
}

export default typeOfRam;