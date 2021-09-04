import graphCardApi from "../DAL/graphCardAPI";
import { setBackEndMessage, setError } from "./errorReducer";
import { setAuthData } from "./authReducer";

const SET_GRAPH_CARD = "SET_GRAPH_CARD";
const SET_CURRENT_GRAPH_CARD = "SET_CURRENT_GRAPH_CARD";
const GRAPH_CARD_IS_LOADING = "GRAPH_CARD_IS_LOADING";
// const SET_ERROR_GRAPHCARD = "SET_ERROR_GRAPHCARD";
const SET_ALL_GRAPHCARD = "SET_ALL_GRAPHCARD";
// const SET_MESSAGE_GRAPHCARD = "SET_MESSAGE_GRAPHCARD";
const SEARCH_GRAPHCARD = "SEARCH_GRAPHCARD";

const initialState = {
  graphCard: [],
  allGraphCard: [],
  pagination: {},
  current: {},
  isLoading: false,
  // errorCode: 0,
  // backEndMessage: "",
  searchField: "",
};

const graphCardReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_GRAPH_CARD: {
      return {
        ...state,
        graphCard: [...action.graphCard],
        pagination: { ...action.pagination },
      };
    }
    case GRAPH_CARD_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_CURRENT_GRAPH_CARD: {
      return {
        ...state,
        current: { ...action.current },
      };
    }

    // case SET_ERROR_GRAPHCARD: {
    //   return {
    //     ...state,
    //     errorCode: action.error,
    //   };
    // }
    case SET_ALL_GRAPHCARD: {
      return {
        ...state,
        allGraphCard: [...action.graphCard],
      };
    }
    // case SET_MESSAGE_GRAPHCARD: {
    //   return {
    //     ...state,
    //     backEndMessage: action.message,
    //   };
    // }
    case SEARCH_GRAPHCARD: {
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

export const setGraphCard = (graphCard, pagination) => ({
  type: SET_GRAPH_CARD,
  graphCard,
  pagination,
});

const toggleIsLoading = (isLoading) => ({
  type: GRAPH_CARD_IS_LOADING,
  isLoading,
});

export const setCurrentGraphCard = (current) => ({
  type: SET_CURRENT_GRAPH_CARD,
  current,
});

// export const setError = (error) => ({ type: SET_ERROR_GRAPHCARD, error });

export const setAllGraphCard = (graphCard) => ({
  type: SET_ALL_GRAPHCARD,
  graphCard,
});

// export const setBackEndMessage = (message) => ({
//   type: SET_MESSAGE_GRAPHCARD,
//   message,
// });

export const changeSearch = (text) => ({
  type: SEARCH_GRAPHCARD,
  text,
});
// THUNK

const mapsField = (resData) => {
  const newRows = resData.map((e) => {
    const row = {};
    row.id = e.idGraph;
    row.vendor = e.name;
    row.model = e.model;
    row.socketGraph = e.typeOfGraphSlot;
    row.volume = parseInt(e.volume, 10);
    return row;
  });
  return newRows;
};

const unMapsField = (graphCard) => {
  const toApiData = {
    idGraph: graphCard.id,
    name: graphCard.vendor,
    model: graphCard.model,
    typeOfGraphSlot: graphCard.socketGraph,
    volume: graphCard.volume,
  };
  return toApiData;
};

export const getGraphCardData = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.all(page, search);
    if (res.data.result) {
      const finalRes = mapsField(res.data.result);
      dispatch(setGraphCard(finalRes, res.data.pagination));
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

export const getAllGraphCard = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.allToScroll();
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setAllGraphCard(finalRes));
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

export const addGraphCardData = (graphCard, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.add(unMapsField(graphCard));
    if (res.data.status) {
      dispatch(getGraphCardData(page, text));
      dispatch(getAllGraphCard());
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

export const updateGraphCardData = (graphCard, page, text) => async (
  dispatch
) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.update(unMapsField(graphCard));
    if (res.data.status) {
      dispatch(getGraphCardData(page, text));
      dispatch(getAllGraphCard());
      dispatch(
        setCurrentGraphCard({
          ...graphCard,
          volume: parseInt(graphCard.volume, 10),
        })
      );
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

export const deleteGraphCard = (id, page, text) => async (dispatch) => {
  const delItem = { idGraph: id };
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.delete(delItem);
    if (res.data.status) {
      dispatch(getGraphCardData(page, text));
      dispatch(getAllGraphCard());
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

export default graphCardReducer;
