import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
});

export const authAPI = {
    me() {
        console.log(instance.get('auth/me'))
        return instance.get('auth/me')
    }
}