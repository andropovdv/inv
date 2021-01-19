import Axios from 'axios';

const instance = Axios.create({
    baseURL: "http://localhost:4000/v2/GraphCard",
    withCredentials: true
})

const graphCardApi = {
    all(page) {
        return instance.get(`?page=${page}`)
    },
    add(graphCard) {
        return instance.post('/', graphCard)
    },
    update(graphCard) {
        return instance.put('/', graphCard)
    },
    delete(id) {
        return instance.delete(`/${id}`)
    },
    allToScroll() {
        return instance.get('/all')
    }
}

export default graphCardApi;