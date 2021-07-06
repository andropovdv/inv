const SET_ERRORCODE = "SET_ERRORCODE";
const SET_BACKEND_MESSAGE = "SET_BACKEND_MESSAGE";

const initialState = {
  backEndMessage: "",
  errorCode: null,
};

const errorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_BACKEND_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
      };
    }
    case SET_ERRORCODE: {
      return {
        ...state,
        errorCode: action.code,
      };
    }
    default:
      return state;
  }
};

export const setBackEndMessage = (message) => ({
  type: SET_BACKEND_MESSAGE,
  message,
});

export const setError = (code) => ({ type: SET_ERRORCODE, code });

export default errorReducer;
