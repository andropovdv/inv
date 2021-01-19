import Axios from 'axios';

const instance = Axios.create({
    baseURL: "http://localhost:4000/v2/formFactor",
    withCredentials: true
})

const formFactorAPI = {
    all(page) {
        return instance.get(`?page=${page}`)
    },
    add(formFactor) {
        return instance.post('/', formFactor)
    },
    update(formFactor) {
        return instance.put('/', formFactor)
    },
    delete(id) {
        return instance.delete(`/${id}`)
    },
    allToScroll() {
        return instance.get('/all')
    }
}

export default formFactorAPI;