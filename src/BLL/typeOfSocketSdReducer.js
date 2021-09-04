import socketSdAPI from "../DAL/typeOfSocketSdAPI";
import { setAuthData } from "./authReducer";
import { setBackEndMessage, setError } from "./errorReducer";

const SET_SOCKETSD = "SET_SOCKETSD";
const SET_ALL_SOCKETSD = "SET_ALL_SOCKETSD";
const SET_CURRENT_SOCKETSD = "SET_CURRENT_SOCKETSD";
const LOADING_SOACKETSD = "LOADING_SOACKETSD";
const SEARCH_SOCKETSD = "SEARCH_SOCKETSD";

const initialState = {
  socketSd: [],
  socketSdAll: [],
  pagination: {},
  current: {},
  isLoading: false,
  searchField: "",
};

const typeOfSocketSdReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_SOACKETSD: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_SOCKETSD: {
      return {
        ...state,
        socketSd: [...action.socketSd],
        pagination: { ...action.pagination },
      };
    }
    case SET_ALL_SOCKETSD: {
      return {
        ...state,
        socketSdAll: [...action.socketSdAll],
      };
    }
    case SET_CURRENT_SOCKETSD: {
      return {
        ...state,
        current: { ...action.current },
      };
    }
    case SEARCH_SOCKETSD: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

export const setSocketSd = (socketSd, pagination) => ({
  type: SET_SOCKETSD,
  socketSd,
  pagination,
});

export const setSocketSdAll = (socketSdAll) => ({
  type: SET_ALL_SOCKETSD,
  socketSdAll,
});

export const setCurrentSocketSd = (current) => ({
  type: SET_CURRENT_SOCKETSD,
  current,
});

export const toggleIsLoading = (isLoading) => ({
  type: LOADING_SOACKETSD,
  isLoading,
});

export const changeSearch = (text) => ({
  type: SEARCH_SOCKETSD,
  text,
});

const mapsField = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idSocket;
    row.socket = e.socketSD;
    return row;
  });
  return newRows;
};

const unMapsField = (socket) => {
  const toApi = {
    idSocket: socket.id,
    socketSD: socket.socket,
  };
  return toApi;
};

export const getSocketSdData = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await socketSdAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setSocketSd(finalRes, res.data.pagination));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const getAllSocketSd = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await socketSdAPI.alltoScroll();
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setSocketSdAll(finalRes));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const addSocketSdData = (socket, page, text) => async (dispatch) => {
  const finalRes = unMapsField(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await socketSdAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getSocketSdData(page, text));
      dispatch(getAllSocketSd());
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const updateSocketSdData = (socket, page, text) => async (dispatch) => {
  const finalRes = unMapsField(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await socketSdAPI.update(finalRes);
    if (res.data.status) {
      dispatch(getSocketSdData(page, text));
      dispatch(getAllSocketSd());
      dispatch(setCurrentSocketSd(socket));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const deleteSocketSdData = (id, page, text) => async (dispatch) => {
  const finalRes = { idSocket: id };
  dispatch(toggleIsLoading(true));
  try {
    const res = await socketSdAPI.delete(finalRes);
    if (res.data.status) {
      dispatch(getSocketSdData(page, text));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export default typeOfSocketSdReducer;
