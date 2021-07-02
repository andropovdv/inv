import { getAuthData } from "./authReducer";

const INITIALIZED_SUCCESS = "INITIALIZED_SUCCESS";

const initialState = {
  initialized: false,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({ type: INITIALIZED_SUCCESS });

export const initializeApp = () => (dispatch) => {
  // if (localStorage.getItem("token")) {
  const promise = dispatch(getAuthData());
  Promise.all([promise]).then(() => {
    dispatch(initializedSuccess());
  });
  // }
  // dispatch(initializedSuccess());
};

export default appReducer;
