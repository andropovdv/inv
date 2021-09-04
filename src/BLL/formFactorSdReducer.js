import formFactorSdAPI from "../DAL/formFactorSdAPI";
import { setAuthData } from "./authReducer";
import { setBackEndMessage, setError } from "./errorReducer";

const SET_FFACTOR_SD = "SET_FFACTOR_SD";
const SET_ALL_FFACTOR_SD = "SET_ALL_FFACTOR_SD";
const SET_CURRENT_FFACTOR_SD = "SET_CURRENT_FFOCTOR_SD";
const LOADING_FFACTOR_SD = "LOADING_FFACTOR_SD";
const SEARCH_FFACTOR_SD = "SEARCH_FFACTOR_SD";

const initialState = {
  formFactorSD: [],
  formFactorSDAll: [],
  pagination: {},
  current: {},
  isLoading: false,
  searchField: "",
};

const formFactorSdReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_FFACTOR_SD: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_FFACTOR_SD: {
      return {
        ...state,
        formFactorSD: [...action.formFactorSD],
        pagination: { ...action.pagination },
      };
    }
    case SET_ALL_FFACTOR_SD: {
      return {
        ...state,
        formFactorSDAll: [...action.formFactorSDAll],
      };
    }
    case SET_CURRENT_FFACTOR_SD: {
      return {
        ...state,
        current: { ...action.current },
      };
    }
    case SEARCH_FFACTOR_SD: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

export const setFormFactorSD = (formFactorSD, pagination) => ({
  type: SET_FFACTOR_SD,
  formFactorSD,
  pagination,
});

export const setFormFactorSDAll = (formFactorSDAll) => ({
  type: SET_ALL_FFACTOR_SD,
  formFactorSDAll,
});

export const setCurrentFormFactorSD = (current) => ({
  type: SET_CURRENT_FFACTOR_SD,
  current,
});

export const toggleIsLoading = (isLoading) => ({
  type: LOADING_FFACTOR_SD,
  isLoading,
});

export const changeSearch = (text) => ({
  type: SEARCH_FFACTOR_SD,
  text,
});

const mapsField = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idFormFactorSD;
    row.formFactorSD = e.formFactorSD;
    return row;
  });
  return newRows;
};

const unMapsField = (formFactor) => {
  const toApi = {
    idFormFactorSD: formFactor.id,
    formFactorSD: formFactor.formFactorSD,
  };
  return toApi;
};

export const getFactorSD = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorSdAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsField(res.data.result);
      dispatch(setFormFactorSD(finalRes, res.data.pagination));
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

export const getAllFactorSD = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorSdAPI.allToScroll();
    if (res.data.result) {
      const finalRes = mapsField(res.data.result);
      dispatch(setFormFactorSDAll(finalRes));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      if (res.data.message === "Не авторизован") {
        dispatch(setAuthData(null, null, null, false));
      }
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.messge));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const addFactorSD = (factor, page, text) => async (dispatch) => {
  const finalRes = unMapsField(factor);
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorSdAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getFactorSD(page, text));
      dispatch(getAllFactorSD());
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

export const updateFactorSD = (factor, page, text) => async (dispatch) => {
  const finalRes = unMapsField(factor);
  try {
    const res = await formFactorSdAPI.update(finalRes);
    if (res.data.status) {
      dispatch(getFactorSD(page, text));
      dispatch(getAllFactorSD());
      dispatch(setCurrentFormFactorSD(factor));
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

export const deleteFactorSD = (id, page, text) => async (dispatch) => {
  const finalRes = { idFormFactorSD: id };
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorSdAPI.delete(finalRes);
    if (res.data.status) {
      dispatch(getFactorSD(page, text));
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

export default formFactorSdReducer;
