import graphCardApi from "../DAL/graphCardAPI";

const SET_GRAPH_CARD = "SET_GRAPH_CARD";
const SET_CURRENT_GRAPH_CARD = "SET_CURRENT_GRAPH_CARD";
const GRAPH_CARD_IS_LOADING = "GRAPH_CARD_IS_LOADING";
const SET_ERROR_GRAPHCARD = "SET_ERROR_GRAPHCARD";
const SET_ALL_GRAPHCARD = "SET_ALL_GRAPHCARD";
const SET_MESSAGE_GRAPHCARD = "SET_MESSAGE_GRAPHCARD";
const SEARCH_GRAPHCARD = "SEARCH_GRAPHCARD";

const initialState = {
  graphCard: [],
  allGraphCard: [],
  pagination: {},
  currentRow: {},
  isLoading: false,
  errorCode: 0,
  backEndMessage: "",
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
        currentRow: { ...action.current },
      };
    }

    case SET_ERROR_GRAPHCARD: {
      return {
        ...state,
        errorCode: action.error,
      };
    }
    case SET_ALL_GRAPHCARD: {
      return {
        ...state,
        allGraphCard: [...action.grapgCard],
      };
    }
    case SET_MESSAGE_GRAPHCARD: {
      return {
        ...state,
        backEndMessage: action.text,
      };
    }
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

export const setError = (error) => ({ type: SET_ERROR_GRAPHCARD, error });

export const setAllGraphCard = (graphCard) => ({
  type: SET_ALL_GRAPHCARD,
  graphCard,
});

export const setBackEndMessage = (message) => ({
  type: SET_MESSAGE_GRAPHCARD,
  message,
});

export const changeSearch = (text) => ({
  type: SEARCH_GRAPHCARD,
  text,
});
// THUNK

const mapsField = (resData) => {
  const newRows = resData.map((e) => {
    const row = {};
    row.id = e.graph_id;
    row.vendor = e.name;
    row.model = e.model;
    row.socketGraph = e.typeOfGraphSlot;
    row.volume = e.volume;
    return row;
  });
  return newRows;
};

export const getGraphCard = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await graphCardApi.all(page, text);
    if (res.data.result) {
      const finalRes = mapsField(res.data.resutl);
      dispatch(setGraphCard(finalRes));
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

export default graphCardReducer;
