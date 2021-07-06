import vendorAPI from "../DAL/vendorAPI";
import { setAuthData } from "./authReducer";
import { setBackEndMessage, setError } from "./errorReducer";

const VENDOR_IS_LOADING = "VENDOR_IS_LOADING";
const SET_VENDORS = "SET_VENDORS";
const SET_VENDORS_ALL = "SET_VENDORS_ALL";
const SET_CURRENT_VENDOR = "SET_CURRENT_VENDOR";
const SET_SEARCH_FIELD = "SET_SEARCH_FIELD";

const initialState = {
  vendors: [],
  currentVendor: {},
  vendorsAll: [],
  pagination: {},
  isLoading: true,
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
    case SET_SEARCH_FIELD: {
      return {
        ...state,
        searchField: action.text,
      };
    }
    default:
      return state;
  }
};

// AS

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

export const changeSearch = (text) => ({ type: SET_SEARCH_FIELD, text });

// THUNK

const mapsFields = (resApi) => {
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

const unMapsField = (vendor) => {
  const toApi = {
    id_vendor: vendor.id,
    name: vendor.vendor,
    full_name: vendor.full,
    url: vendor.url,
  };
  return toApi;
};

export const getVendorsData = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  } else {
    search = undefined;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setVendorsData(finalRes, res.data.pagination));
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

export const getVendorAllData = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.allToScroll();
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      await dispatch(setVendorsAllData(finalRes));
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

export const deleteVendorData = (idVendor, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const responce = { id_vendor: idVendor };
  try {
    const res = await vendorAPI.delete(responce);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
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
    dispatch(changeSearch(""));
    dispatch(toggleIsLoading(false));
  }
};

export const addVendorData = (vendor, page, text) => async (dispatch) => {
  const finalRes = unMapsField(vendor);
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
      dispatch(getVendorAllData());
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

export const updateVendorData = (vendor, page, text) => async (dispatch) => {
  const finalRes = unMapsField(vendor);
  dispatch(toggleIsLoading(true));
  try {
    const res = await vendorAPI.update(finalRes);
    if (res.data.status) {
      dispatch(getVendorsData(page, text));
      dispatch(getVendorAllData());
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
    dispatch(changeSearch(""));
    dispatch(toggleIsLoading(false));
  }
};

export default vendorReducer;
