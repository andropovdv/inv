
import { authAPI } from '../DAL/authAPI';
const SET_USER_DATA = 'SET_USER_DATA';

let initialState = {
    userID: null,
    email: null,
    name: null,
    isAuth: false
}

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_USER_DATA:
            debugger
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
}

export const setAuthData = (userID, name, email, isAuth) => (
    { type: SET_USER_DATA, payload: { userID, email, name, isAuth } }
)

export const getAuthData = () => (dispatch) => {
    return authAPI.me().then(responce => {
        debugger
        if (responce.data.status) {
            let { userID, name, email } = responce.data.result;
            dispatch(setAuthData(userID, name, email, true))
        }
    })
}



export default authReducer;