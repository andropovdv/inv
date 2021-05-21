import typeOfRamAPI from "../DAL/typeOfRamAPI";

const SET_TYPE_OF_RAM = "SET_TYPE_OF_RAM";
const SET_ALL_TYPE_OF_RAM = "SET_ALL_TYPE_OF_RAM";
const SET_CURRENT_TYPE_OF_RAM = "SET_CURRENT_TYPE_OF_RAM";
const SET_ERROR_TYPE_OF_RAM = "SET_ERROR_TYPE_OF_RAM";
const TYPE_OF_RAM_IS_LOADING = "TYPE_OF_RAM_IS_LOADING";
const SET_SOCKETRAM_MESSAGE = "SET_SOCKETRAM_MESSAGE";
const SEARCH_SOCKET_RAM = "SEARCH_SOCKET_RAM";

const initialState = {
  typeOfRam: [],
  typeOfRamAll: [],
  pagination: {},
  currentType: {},
  isLoading: true,
  errorCode: 0,
  backEndMessage: "",
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
    case SET_ERROR_TYPE_OF_RAM: {
      return {
        ...state,
        errorCode: action.error,
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
    case SET_SOCKETRAM_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
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

export const setError = (error) => ({ type: SET_ERROR_TYPE_OF_RAM, error });

export const setAllTypeOfRam = (allTypeOfRam) => ({
  type: SET_ALL_TYPE_OF_RAM,
  allTypeOfRam,
});

export const setBackEndMessage = (message) => ({
  type: SET_SOCKETRAM_MESSAGE,
  message,
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

export const getTypeOfRamData = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.all(page, text);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setTypeOfRamData(finalRes, res.data.pagination));
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
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
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const addTypeOfRamData = (socket, page, text) => async (dispatch) => {
  const newObj = { typeOfRam: socket.socketRam };
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.add(newObj);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
      dispatch(getAllTypeOfRam());
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const updateTypeOfRamData = (socket, page, text) => async (dispatch) => {
  const newObj = {
    id_typeRam: socket.id,
    typeOfRam: socket.ramSocket,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfRamAPI.update(newObj);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
      dispatch(getAllTypeOfRam());
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
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
  try {
    const res = await typeOfRamAPI.delete(id);
    if (res.data.status) {
      dispatch(getTypeOfRamData(page, text));
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const getSearchSocketRam = (text, page) => async (dispatch) => {
  if (text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await typeOfRamAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsFields(res.data.result);
        dispatch(setTypeOfRamData(finalRes, res.data.pagination));
        dispatch(changeSearch(text));
      } else {
        dispatch(setError(res.data.errorCode));
        dispatch(setBackEndMessage(res.data.message));
      }
    } catch (e) {
      dispatch(setError(500));
      dispatch(setBackEndMessage(e.message));
    } finally {
      dispatch(toggleIsLoading(false));
    }
  } else {
    dispatch(changeSearch(text));
    dispatch(getTypeOfRamData());
  }
};

export default typeOfRamReducer;
