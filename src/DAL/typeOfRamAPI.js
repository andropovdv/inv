import Axios from 'axios';

const instance = Axios.create({
    baseURL: "http://localhost:4000/v2/typeOfRam",
    withCredentials: true
})

const typeOfRam = {
    all(page) {
        return instance.get(`?page=${page}`)
    }
}

export default typeOfRam;