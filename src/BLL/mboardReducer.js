import mboardAPI from "../DAL/mboardAPI";

const SET_MBOARD = "SET_MBOARD";
const MBOARD_IS_LOADING = "MBOARD_IS_LOADING";
const SET_CURRENT_MBOARD = "SET_CURRENT_MBOARD";
const SET_ERROR_MBOARD = "SET_ERROR_MBOARD";
const SET_ALL_MBOARD = "SET_ALL_MBOARD";
const SET_MBOARD_MESSAGE = "SET_MBOARD_MESSAGE";
const SEARCH_MBOARD = "SEARCH_MBOARD";

const initialState = {
  mboard: [],
  allMboard: [],
  pagination: {},
  current: {},
  isLoading: false,
  errorCode: 0,
  backEndMessage: "",
  searchField: "",
};

const mboardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_MBOARD: {
      return {
        ...state,
        mboard: [...action.mboard],
        pagination: { ...action.pagination },
      };
    }
    case MBOARD_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_CURRENT_MBOARD: {
      return {
        ...state,
        current: { ...action.current },
      };
    }
    case SET_ERROR_MBOARD: {
      return {
        ...state,
        errorCode: action.error,
      };
    }
    case SET_ALL_MBOARD: {
      return {
        ...state,
        allMboard: [...action.mboard],
      };
    }
    case SET_MBOARD_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
      };
    }
    case SEARCH_MBOARD: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

export const setMboard = (mboard, pagination) => ({
  type: SET_MBOARD,
  mboard,
  pagination,
});

export const toggleIsLoading = (isLoading) => ({
  type: MBOARD_IS_LOADING,
  isLoading,
});

export const setCurrentMboard = (current) => ({
  type: SET_CURRENT_MBOARD,
  current,
});

export const setError = (error) => ({
  type: SET_ERROR_MBOARD,
  error,
});

export const setAllMboard = (mboard) => ({
  type: SET_ALL_MBOARD,
  mboard,
});

export const setBackEndMessage = (message) => ({
  type: SET_MBOARD_MESSAGE,
  message,
});

export const changeSearch = (text) => ({
  type: SEARCH_MBOARD,
  text,
});

const mapsField = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idmBoard; //
    row.vendor = e.name; // +
    row.model = e.model; // +
    row.socketCpu = e.name_typeSocketCpu; // +
    row.intGraph = e.intGraph === 1; // +
    row.socketRam = e.typeOfRam; // +
    row.quantitySocketRam = e.numSlotRam; // +
    row.socketGraph = e.typeOfGraphSlot; // +
    row.quantityPCI = e.numPCI; // +
    row.quantityPCIE = e.numPCIE; // +
    row.quantityIDE = e.numIDE; // +
    row.quantitySATA = e.numSATA; // +
    row.formFactor = e.formFactor; // +
    row.intLAN = e.intLAN === 1; // +
    row.intSound = e.intSound === 1; // +
    return row;
  });
  return newRows;
};

const unMapsFields = (mboard) => {
  let sound = 0;
  let graph = 0;
  let lan = 0;
  if (mboard.intSound) sound = 1;
  if (mboard.intLan) lan = 1;
  if (mboard.intGraph) graph = 1;

  const addMboard = {
    idmBoard: mboard.id,
    name: mboard.vendor,
    model: mboard.model,
    name_typeSocketCpu: mboard.socketCpu,
    intGraph: graph,
    typeOfRam: mboard.socketRam,
    numSlotRam: mboard.quantitySocketRam,
    typeOfGraphSlot: mboard.socketGraph,
    numPCI: mboard.quantityPCI,
    numPCIE: mboard.quantityPCIE,
    numIDE: mboard.quantityIDE,
    numSATA: mboard.quantitySATA,
    formFactor: mboard.formFactor,
    intLan: lan,
    intSound: sound,
  };
  return addMboard;
};

export const getMboardData = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await mboardAPI.all(page, text);
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setMboard(finalRes, res.data.pagination));
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

export const getAllMboardData = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await mboardAPI.allToScroll();
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setAllMboard(finalRes));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const deleteMboardData = (id, page, text) => async (dispatch) => {
  const delItem = { idmBoard: id.id };
  dispatch(toggleIsLoading(true));
  try {
    const res = await mboardAPI.delete(delItem);
    if (res.data.status) {
      dispatch(getMboardData(page, text));
      dispatch(getAllMboardData());
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

export const addMboardData = (mboard, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const finalData = unMapsFields(mboard);
    const res = await mboardAPI.add(finalData);
    if (res.data.status) {
      dispatch(getMboardData(page, text));
      dispatch(getAllMboardData());
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

export const updateMboardData = (mboard, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const finalData = unMapsFields(mboard);
    const res = await mboardAPI.update(finalData);
    if (res.data.status) {
      dispatch(getMboardData(page, text));
      dispatch(getAllMboardData());
      dispatch(setCurrentMboard(mboard));
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

export const getSearchMboard = (text, page) => async (dispatch) => {
  if (text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await mboardAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsField(res.data.result);
        dispatch(setMboard(finalRes, res.data.pagination));
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
    dispatch(getMboardData());
  }
};

export default mboardReducer;
