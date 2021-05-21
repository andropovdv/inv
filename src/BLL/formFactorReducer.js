import formFactorAPI from "../DAL/formFactorAPI";

const SET_FORM_FACTOR = "SET_FORM_FACTOR";
const FORM_FACTOR_IS_LOADING = "FORM_FACTOR_IS_LOADING";
const SET_CURRENT_FORM_FACTOR = "SET_CURRENT_FORM_FACTOR";
const SET_ERROR_FORM_FACTOR = "SET_ERROR_FORM_FACTOR";
const SET_ALL_FORM_FACTOR = "SET_ALL_FORM_FACTOR";
const SET_FORMFACTOR_MESSAGE = "SET_FORMFACTOR_MESSAGE";
const SEARCH_FORMFACTOR = "SEARCH_FORMFACTOR";

const initialState = {
  formFactor: [],
  allFormFactor: [],
  pagination: {},
  currentType: {},
  isLoading: false,
  errorCode: 0,
  backEndMessage: "",
  searchField: "",
};

const formFactorReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_ALL_FORM_FACTOR: {
      return {
        ...state,
        allFormFactor: [...action.formFactor],
      };
    }
    case SET_ERROR_FORM_FACTOR: {
      return {
        ...state,
        errorCode: action.error,
      };
    }
    case SET_CURRENT_FORM_FACTOR: {
      return {
        ...state,
        currentType: { ...action.current },
      };
    }
    case SET_FORM_FACTOR: {
      return {
        ...state,
        formFactor: [...action.formFactor],
        pagination: { ...action.pagination },
      };
    }
    case FORM_FACTOR_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_FORMFACTOR_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
      };
    }
    case SEARCH_FORMFACTOR: {
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

const setAllFormFactor = (formFactor) => ({
  type: SET_ALL_FORM_FACTOR,
  formFactor,
});

const toggleIsLoading = (isLoading) => ({
  type: FORM_FACTOR_IS_LOADING,
  isLoading,
});

export const setFormFactor = (formFactor, pagination) => ({
  type: SET_FORM_FACTOR,
  formFactor,
  pagination,
});

export const setCurrentFormFactor = (current) => ({
  type: SET_CURRENT_FORM_FACTOR,
  current,
});

export const setError = (error) => ({
  type: SET_ERROR_FORM_FACTOR,
  error,
});

export const setBackEndMessage = (message) => ({
  type: SET_FORMFACTOR_MESSAGE,
  message,
});

export const changeSearch = (text) => ({
  type: SEARCH_FORMFACTOR,
  text,
});

// THUNK

const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idFormFactor;
    row.formFactor = e.formFactor;
    return row;
  });
  return newRows;
};

export const getFormFactor = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorAPI.all(page, text);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setFormFactor(finalRes, res.data.pagination));
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

export const getAllFormFactor = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorAPI.allToScroll();
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setAllFormFactor(finalRes));
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

export const addFormFactor = (formFactor, page, text) => async (dispatch) => {
  const newObj = { formFactor: formFactor.formFactor };
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorAPI.add(newObj);
    if (res.data.status) {
      dispatch(getFormFactor(page, text));
      dispatch(getAllFormFactor());
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

export const updateFormFactor = (formFactor, page, text) => async (
  dispatch
) => {
  const newObj = {
    idFormFactor: formFactor.id,
    formFactor: formFactor.formFactor,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorAPI.update(newObj);
    if (res.data.status) {
      dispatch(getFormFactor(page, text));
      dispatch(getAllFormFactor());
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

export const deleteFormFactor = (id, page, text) => async (dispatch) => {
  const delItem = { idFormFactor: id.id }; // FIXME (здесь правильно) исправить соответсвие полей, с фронта должно уходить поле бэка
  dispatch(toggleIsLoading(true));
  try {
    const res = await formFactorAPI.delete(delItem);
    if (res.data.status) {
      dispatch(getFormFactor(page, text));
      dispatch(getAllFormFactor());
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

export const getSearchFormFactor = (text, page) => async (dispatch) => {
  if (text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await formFactorAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsFields(res.data.result);
        dispatch(setFormFactor(finalRes, res.data.pagination));
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
    dispatch(getFormFactor());
  }
};

export default formFactorReducer;
