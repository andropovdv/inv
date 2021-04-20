import typeOfGraphSlotAPI from "../DAL/typeOfGraphSlotAPI";

const SET_TYPE_OF_GRAPH_SLOT = "SET_TYPE_OF_GRAPH_SLOT";
const SET_CURRENT_TYPE_OF_GRAPH_SLOT = "SET_CURRENT_TYPE_OF_GRAPH_SLOT";
const SET_ALL_TYPE_OF_GRAPH_SLOT = "SET_ALL_TYPE_OF_GRAPH_SLOT";
const TYPE_OF_GRAPH_SLOT_IS_LOADING = "TYPE_OF_GRAPH_SOLT_IS_LOADING";
const SET_ERROR_TYPE_GRAPH_SLOT = "SET_ERROR_TYPE_GROPH_SLOT";
const SET_MESSAGE_TYPE_GRAPH = "SET_MESSAGE_TYPE_GRAPH";
const SEARCH_SOCKET_GRAPH = "SEARCH_SOCKET_GRAPH";

const initialState = {
  typeOfGraphSlot: [],
  typeAllOfGraphSlot: [],
  pagination: {},
  currentType: {},
  isLoading: true,
  errorCode: null,
  backEndMessage: "",
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
    case SET_ERROR_TYPE_GRAPH_SLOT: {
      return {
        ...state,
        errorCode: action.error,
      };
    }
    case SET_MESSAGE_TYPE_GRAPH: {
      return {
        ...state,
        backEndMessage: action.message,
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

export const changeSearch = (text) => {
  return { type: SEARCH_SOCKET_GRAPH, text };
};

export const toggleIsLoading = (isLoading) => {
  return { type: TYPE_OF_GRAPH_SLOT_IS_LOADING, isLoading };
};

export const setTypeOfGraphSlot = (typeSlot, pagination) => {
  return { type: SET_TYPE_OF_GRAPH_SLOT, typeSlot, pagination };
};

export const setCurrentTypeOfGraph = (current) => {
  return { type: SET_CURRENT_TYPE_OF_GRAPH_SLOT, current };
};

export const setError = (error) => {
  return { type: SET_ERROR_TYPE_GRAPH_SLOT, error };
};

export const setBackEndMessage = (message) => {
  return { typw: SET_MESSAGE_TYPE_GRAPH, message };
};

export const setAllTypeOfGraphSlot = (allTypeOfGraphSlot) => {
  return { type: SET_ALL_TYPE_OF_GRAPH_SLOT, allTypeOfGraphSlot };
};

// THUNK

export const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idTypeOfGraphSlot;
    row.graphSocket = e.typeOfGraphSlot;
    return row;
  });
  return newRows;
};

export const getTypeOfGraphSlot = (page) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeOfGraphSlotAPI.all(page);
    if (res.data.result) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setTypeOfGraphSlot(finalRes, res.data.pagination));
      dispatch(toggleIsLoading(false));
    } else {
      dispatch(setBackEndMessage(res.data.error));
      dispatch(toggleIsLoading(false));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
    dispatch(toggleIsLoading(false));
  }
};

export const getSearchSocketGraph = (text, page) => async (dispatch) => {
  if (text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await typeOfGraphSlotAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsFields(res.data.result);
        dispatch(setTypeOfGraphSlot(finalRes, res.data.pagination));
        dispatch(changeSearch(text));
        dispatch(toggleIsLoading(false));
      } else {
        dispatch(setError(res.data.errorCode));
        dispatch(setBackEndMessage(res.data.message));
        dispatch(toggleIsLoading(false));
      }
    } catch (e) {
      dispatch(setError(500));
      dispatch(setBackEndMessage(e.message));
      dispatch(toggleIsLoading(false));
    }
  } else {
    dispatch(changeSearch(text));
    dispatch(getTypeOfGraphSlot());
  }
};

export const getAllTypeOfGraphSlot = () => (dispatch) => {
  dispatch(toggleIsLoading(true));
  typeOfGraphSlotAPI.allToScroll().then((res) => {
    if (res.data.status) {
      dispatch(setAllTypeOfGraphSlot(res.data.typeOfGraphSlot));
    }
  });
  dispatch(toggleIsLoading(false));
};

export const addTypeOfGraphSlot = (typeOfGraphSlot) => (dispatch) => {
  dispatch(toggleIsLoading(true));
  typeOfGraphSlotAPI.add(typeOfGraphSlot).then((res) => {
    if (res.data.status) {
      dispatch(getAllTypeOfGraphSlot());
      dispatch(getTypeOfGraphSlot());
    } else {
      dispatch(setError(res.data.errorCode));
    }
  });
  dispatch(toggleIsLoading(false));
};

export const updateTypeOfGraphSlot = (typeOfGraph) => (dispatch) => {
  dispatch(toggleIsLoading(true));
  typeOfGraphSlotAPI.update(typeOfGraph).then((res) => {
    if (res.data.status) {
      dispatch(getTypeOfGraphSlot());
    } else {
      dispatch(setError(res.data.errorCode));
    }
  });
  dispatch(toggleIsLoading(false));
};

export const deleteTypeOfGraphSlot = (id) => (dispatch) => {
  dispatch(toggleIsLoading(true));
  typeOfGraphSlotAPI.delete(id).then((res) => {
    if (res.data.status) {
      dispatch(getTypeOfGraphSlot());
    } else {
      dispatch(setError(res.data.errorCode));
    }
  });
  dispatch(toggleIsLoading(false));
};

export default typeOfGraphSlotReducer;
