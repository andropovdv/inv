import typeOfRamAPI from "../DAL/typeOfRamAPI";
import { setBackEndMessage, setError } from "./errorReducer";
import { setAuthData } from "./authReducer";

const SET_TYPE_OF_RAM = "SET_TYPE_OF_RAM";
const SET_ALL_TYPE_OF_RAM = "SET_ALL_TYPE_OF_RAM";
const SET_CURRENT_TYPE_OF_RAM = "SET_CURRENT_TYPE_OF_RAM";
const TYPE_OF_RAM_IS_LOADING = "TYPE_OF_RAM_IS_LOADING";
const SEARCH_SOCKET_RAM = "SEARCH_SOCKET_RAM";

const initialState = {
  typeOfRam: [],
  typeOfRamAll: [],
  pagination: {},
  currentType: {},
  isLoading: true,
  searchField: "",
};

const typeOfRamReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_OF_RAM_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_ALL_TYPE_OF_RAM: {
      return {
        ...state,
        typeOfRamAll: [...action.allTypeOfRam],
      };
    }
    case SET_TYPE_OF_RAM: {
      return {
        ...state,
        typeOfRam: [...action.typeOfRam],
        pagination: { ...action.pagination },
      };
    }
    case SET_CURRENT_TYPE_OF_RAM: {
      return {
        ...state,
        currentType: { ...action.current },
      };
    }
    case SEARCH_SOCKET_RAM: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

// ac
export const setTypeOfRamData = (typeOfRam, pagination) => ({
  type: SET_TYPE_OF_RAM,
  typeOfRam,
  pagination,
});

export const setCurrentTypeOfRam = (current) => ({
  type: SET_CURRENT_TYPE_OF_RAM,
  current,
});

export const toggleIsLoading = (isLoading) => ({
  type: TYPE_OF_RAM_IS_LOADING,
  isLoading,
});

export const setAllTypeOfRam = (allTypeOfRam) => ({
  type: SET_ALL_TYPE_OF_RAM,
  allTypeOfRam,
});

export const changeSearch = (text) => ({ type: SEARCH_SOCKET_RAM, text });

// thunk

const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.id_typeRam;
    row.socketRam = e.typeOfRam;
    return row;
  });
  return newRows;
};

const unMapsField = (socket) => {
  const toApi = {
    id_typeRam: socket.id,
    typeOfRam: socket.socketRam,
  };
  return toApi;
};

export const getTypeOfRamData = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setTypeOfRamData(finalRes, res.data.pagination));
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

export const getAllTypeOfRam = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.allToScroll();
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setAllTypeOfRam(finalRes));
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

export const addTypeOfRamData = (socket, page, text) => async (dispatch) => {
  const finalRes = unMapsField(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
      dispatch(getAllTypeOfRam());
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

export const updateTypeOfRamData = (socket, page, text) => async (dispatch) => {
  const finalRes = unMapsField(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.update(finalRes);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
      dispatch(getAllTypeOfRam());
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

export const deleteTypeOfRamData = (id, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const response = { id_typeRam: id };
  try {
    const res = await typeOfRamAPI.delete(response);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
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

export default typeOfRamReducer;
