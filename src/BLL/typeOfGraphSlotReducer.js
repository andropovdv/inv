import typeOfGraphSlotAPI from "../DAL/typeOfGraphSlotAPI";
import { setBackEndMessage, setError } from "./errorReducer";
import { setAuthData } from "./authReducer";

const SET_TYPE_OF_GRAPH_SLOT = "SET_TYPE_OF_GRAPH_SLOT";
const SET_CURRENT_TYPE_OF_GRAPH_SLOT = "SET_CURRENT_TYPE_OF_GRAPH_SLOT";
const SET_ALL_TYPE_OF_GRAPH_SLOT = "SET_ALL_TYPE_OF_GRAPH_SLOT";
const TYPE_OF_GRAPH_SLOT_IS_LOADING = "TYPE_OF_GRAPH_SOLT_IS_LOADING";
const SEARCH_SOCKET_GRAPH = "SEARCH_SOCKET_GRAPH";

const initialState = {
  typeOfGraphSlot: [],
  typeAllOfGraphSlot: [],
  pagination: {},
  currentType: {},
  isLoading: true,
  searchField: "",
};

const typeOfGraphSlotReducer = (state = initialState, action) => {
  switch (action.type) {
    case TYPE_OF_GRAPH_SLOT_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_TYPE_OF_GRAPH_SLOT: {
      return {
        ...state,
        typeOfGraphSlot: [...action.typeSlot],
        pagination: { ...action.pagination },
      };
    }
    case SET_CURRENT_TYPE_OF_GRAPH_SLOT: {
      return {
        ...state,
        currentType: { ...action.current },
      };
    }
    case SET_ALL_TYPE_OF_GRAPH_SLOT: {
      return {
        ...state,
        typeAllOfGraphSlot: [...action.allTypeOfGraphSlot],
      };
    }
    case SEARCH_SOCKET_GRAPH: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

// AC

export const changeSearch = (text) => ({ type: SEARCH_SOCKET_GRAPH, text });

export const toggleIsLoading = (isLoading) => ({
  type: TYPE_OF_GRAPH_SLOT_IS_LOADING,
  isLoading,
});

export const setTypeOfGraphSlot = (typeSlot, pagination) => ({
  type: SET_TYPE_OF_GRAPH_SLOT,
  typeSlot,
  pagination,
});

export const setCurrentTypeOfGraph = (current) => ({
  type: SET_CURRENT_TYPE_OF_GRAPH_SLOT,
  current,
});

export const setAllTypeOfGraphSlot = (allTypeOfGraphSlot) => ({
  type: SET_ALL_TYPE_OF_GRAPH_SLOT,
  allTypeOfGraphSlot,
});

// THUNK

const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idTypeOfGraphSlot;
    row.socketGraph = e.typeOfGraphSlot;
    return row;
  });
  return newRows;
};

const unMapsFields = (socket) => {
  const toApi = {
    idTypeOfGraphSlot: socket.is,
    typeOfGraphSlot: socket.socketGraph,
  };
  return toApi;
};

export const getTypeOfGraphSlot = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setTypeOfGraphSlot(finalRes, res.data.pagination));
    } else {
      dispatch(setBackEndMessage(res.data.error));
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

export const getAllTypeOfGraphSlot = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.allToScroll();
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setAllTypeOfGraphSlot(finalRes));
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

export const addTypeOfGraphSlot = (socket, page, text) => async (dispatch) => {
  const finalRes = unMapsFields(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getTypeOfGraphSlot(page, text));
      dispatch(getAllTypeOfGraphSlot());
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

export const updateTypeOfGraphSlot = (socket, page, text) => async (
  dispatch
) => {
  const finalRes = unMapsFields(socket);
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.update(finalRes);
    if (res.data.status) {
      dispatch(getTypeOfGraphSlot(page, text));
      dispatch(getAllTypeOfGraphSlot());
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

export const deleteTypeOfGraphSlot = (id, page, text) => async (dispatch) => {
  const responce = { idTypeOfGraphSlot: id };
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.delete(responce);
    if (res.data.status) {
      dispatch(getTypeOfGraphSlot(page, text));
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

export default typeOfGraphSlotReducer;
