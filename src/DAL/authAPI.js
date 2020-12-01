import Axios from 'axios';

const instance = Axios.create({
    baseURL: 'http://localhost:4000/',
    withCredentials: true
});

export const authAPI = {
    me() {
        return instance.get('auth/me')
    },
    login(email, pass) {
        return instance.post('auth/login', {email, pass})
    }
}

