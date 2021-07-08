// import { stopSubmit } from "redux-form";
import { authAPI } from "../DAL/authAPI";
import { authIn } from "../DAL/authIn";
import { setBackEndMessage } from "./errorReducer";
// import { authNoKeyAPI } from "../DAL/authNoKeyAPI";

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

// me()
export const getAuthData = () => async (dispatch) => {
  try {
    if (!localStorage.getItem("token")) {
      dispatch(setAuthData(null, null, null, false));
      throw new Error("not token Error");
    }
    const res = await authIn.me();
    // const res = await authAPI.me();
    if (res.data.status) {
      const { userID, name, email } = res.data.result;
      dispatch(setAuthData(userID, name, email, true));
    } else {
      dispatch(setAuthData(null, null, null, false));
    }
  } catch (e) {
    // localStorage.removeItem("token");
    // console.log(e);
  }
};

export const signin = (email, pass) => async (dispatch) => {
  localStorage.removeItem("token");
  const res = await authAPI.login(email, pass);

  if (res.data.status) {
    localStorage.setItem("token", res.data.token);
    dispatch(setBackEndMessage(""));
    dispatch(getAuthData());
  } else {
    dispatch(setBackEndMessage(res.data.message));
  }
  // } else {
  //   const message =
  //     res.data.message.length > 0 ? res.data.message : "Some Error";
  //   dispatch(stopSubmit("login", { _error: message }));
  // }
};

export const logout = () => (dispatch) => {
  dispatch(setAuthData(null, null, null, false));
  localStorage.removeItem("token");
};

export default authReducer;
