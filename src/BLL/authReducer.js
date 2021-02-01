import { stopSubmit } from "redux-form";
import { authAPI } from "../DAL/authAPI";

const SET_USER_DATA = "SET_USER_DATA";

const initialState = {
  userID: null,
  email: null,
  name: null,
  isAuth: false,
};

const authReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export const setAuthData = (userID, name, email, isAuth) => ({
  type: SET_USER_DATA,
  payload: { userID, email, name, isAuth },
});

export const getAuthData = () => (dispatch) => {
  return authAPI.me().then((responce) => {
    if (responce.data.status) {
      const { userID, name, email } = responce.data.result;
      dispatch(setAuthData(userID, name, email, true));
    }
  });
};

export const signin = (email, pass) => (dispatch) => {
  authAPI.login(email, pass).then((responce) => {
    if (responce.data.status) {
      dispatch(getAuthData());
    } else {
      const message =
        responce.data.message.length > 0 ? responce.data.message : "Some Error";
      dispatch(stopSubmit("login", { _error: message }));
    }
  });
};

export const logout = () => (dispatch) => {
  authAPI.logout().then((responce) => {
    if (responce.data.status) {
      dispatch(setAuthData(null, null, null, false));
    }
  });
};

export default authReducer;
