import vendorAPI from "../DAL/vendorAPI";

const VENDOR_IS_LOADING = "VENDOR_IS LOADING";
const SET_VENDORS = "SET_VENDORS";
const SET_VENDORS_ALL = "SET_VENDORS_ALL";
const SET_CURRENT_VENDOR = "SET_CURRENT_VENDOR";
const SET_ERROR_VENDOR = "SET_ERROR_VENDOR";
const SET_SEARCH_FIELD = "SET_SEARCH_FIELD";
const SET_VENDOR_MESSAGE = "SET_VENDOR_MESSAGE";

const initialState = {
  vendors: [],
  currentVendor: {},
  vendorsAll: [],
  pagination: {},
  isLoading: true,
  errorCode: null,
  backEndMessage: "",
  searchField: "",
};

const vendorReducer = (state = initialState, action) => {
  switch (action.type) {
    case VENDOR_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_VENDORS: {
      return {
        ...state,
        vendors: [...action.vendors],
        pagination: { ...action.pagination },
      };
    }
    case SET_VENDORS_ALL: {
      return {
        ...state,
        vendorsAll: [...action.vendors],
      };
    }
    case SET_CURRENT_VENDOR: {
      return {
        ...state,
        currentVendor: { ...action.currentVendor },
      };
    }
    case SET_ERROR_VENDOR: {
      return {
        ...state,
        errorCode: action.code,
      };
    }
    case SET_SEARCH_FIELD: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    case SET_VENDOR_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
      };
    }
    default:
      return state;
  }
};

// AS

export const setBackEndMessage = (message) => ({
  type: SET_VENDOR_MESSAGE,
  message,
});

export const toggleIsLoading = (isLoading) => ({
  type: VENDOR_IS_LOADING,
  isLoading,
});

export const setVendorsData = (vendors, pagination) => ({
  type: SET_VENDORS,
  vendors,
  pagination,
});

export const setVendorsAllData = (vendors) => ({
  type: SET_VENDORS_ALL,
  vendors,
});

export const setCurrentVendor = (currentVendor) => ({
  type: SET_CURRENT_VENDOR,
  currentVendor,
});

export const setError = (code) => ({ type: SET_ERROR_VENDOR, code });

export const changeSearch = (text) => ({ type: SET_SEARCH_FIELD, text });

// THUNK

export const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.id_vendor;
    row.vendor = e.name;
    row.full = e.full_name;
    row.url = e.url;
    return row;
  });
  return newRows;
};

export const getVendorsData = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.all(page, text);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setVendorsData(finalRes, res.data.pagination));
    } else {
      dispatch(setBackEndMessage(res.data.error));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
  } finally {
    dispatch(toggleIsLoading(false));
  }
};

export const getVendorAllData = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const res = await vendorAPI.allToScroll();
  if (res.data.status) {
    const newRows = res.data.result.map((e) => {
      const row = {};
      row.id = e.id_vendor;
      row.label = e.name;
      return row;
    });
    await dispatch(setVendorsAllData(newRows));
    dispatch(toggleIsLoading(false));
  } else {
    dispatch(setError(res.data.errorCode));
    dispatch(setBackEndMessage(res.data.message));
    dispatch(toggleIsLoading(false));
  }
};

export const getSearchData = (text, page) => async (dispatch) => {
  if (text && text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await vendorAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsFields(res.data.result);
        dispatch(setVendorsData(finalRes, res.data.pagination));
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
    dispatch(getVendorsData());
  }
};

export const deleteVendorData = (idVendor, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const responce = { id_vendor: idVendor };
  try {
    const res = await vendorAPI.delete(responce);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
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

export const addVendorData = (vendor, page, text) => async (dispatch) => {
  const newObj = {
    name: vendor.vendor,
    full_name: vendor.full,
    url: vendor.url,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.add(newObj);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
      dispatch(getVendorAllData());
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
};

export const updateVendorData = (updateVendor, page, text) => async (
  dispatch
) => {
  const newObj = {
    id_vendor: updateVendor.id,
    name: updateVendor.vendor,
    full_name: updateVendor.full,
    url: updateVendor.url,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.update(newObj);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
      dispatch(getVendorAllData());
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
};

export default vendorReducer;
