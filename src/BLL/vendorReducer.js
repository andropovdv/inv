import { stopSubmit } from "redux-form";
import vendorAPI from "../DAL/vendorAPI";

const VENDOR_IS_LOADING = "VENDOR_IS LOADING";
const SET_VENDORS = "SET_VENDORS";
const SET_VENDORS_ALL = "SET_VENDORS_ALL";
const SET_CURRENT_VENDOR = "SET_CURRENT_VENDOR";
const SET_ERROR_VENDOR = "SET_ERROR_VENDOR";
const SET_SEARCH_FIELD = "SET_SEARCH_FIELD";

const initialState = {
  vendors: [],
  currentVendor: {},
  vendorsAll: [],
  pagination: {},
  isLoading: true,
  errorCode: 0,
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
    default:
      return state;
  }
};

// AS
export const toggleIsLoading = (isLoading) => {
  return { type: VENDOR_IS_LOADING, isLoading };
};

export const setVendorsData = (vendors, pagination) => {
  return { type: SET_VENDORS, vendors, pagination };
};

export const setVendorsAllData = (vendors) => {
  return { type: SET_VENDORS_ALL, vendors };
};

export const setCurrentVendor = (currentVendor) => {
  return {
    type: SET_CURRENT_VENDOR,
    currentVendor,
  };
};

export const setError = (code) => {
  return { type: SET_ERROR_VENDOR, code };
};

export const changeSearch = (text) => {
  return { type: SET_SEARCH_FIELD, text };
};

// THUNK

export const getSearchData = (text) => (dispatch) => {
  if (text.length > 3) {
    dispatch(toggleIsLoading(true));
    // TODOзапрос к API
    vendorAPI.searchItem({ str: text }).then((res) => {
      if (res.data.status) {
        const newRows = res.data.vendors.map((e) => {
          const row = { ...e };
          row.id = e.id_vendor;
          return row;
        });
        dispatch(setVendorsData(newRows));
      }
    });
    dispatch(changeSearch(text));
    dispatch(toggleIsLoading(false));
  } else {
    dispatch(changeSearch(text));
  }
};

export const getVendorsData = (page) => (dispatch) => {
  dispatch(toggleIsLoading(true));
  vendorAPI.all(page).then((res) => {
    // Добовляю поле ID для компонента DataGrid
    const newRows = res.data.vendors.map((e) => {
      const row = { ...e };
      row.id = e.id_vendor;
      return row;
    });

    dispatch(setVendorsData(newRows, res.data.pagination));
  });
  dispatch(toggleIsLoading(false));
};

export const getVendorAllData = () => (dispatch) => {
  dispatch(toggleIsLoading(true));
  vendorAPI.allToScroll().then((res) => {
    if (res.data.status) {
      dispatch(toggleIsLoading(false));
      dispatch(setVendorsAllData(res.data.vendors));
    }
  });
};

export const updateVendorData = (updateVendor) => (dispatch) => {
  vendorAPI.update(updateVendor).then((res) => {
    if (res.data.status) {
      dispatch(getVendorsData());
    }
  });
};

export const deleteVendorData = (idVendor) => (dispatch) => {
  vendorAPI.delete(idVendor).then((res) => {
    if (res.data.status) {
      dispatch(getVendorsData());
    }
  });
};

export const addVendorData = (vendor) => (dispatch) => {
  dispatch(toggleIsLoading(true));
  vendorAPI.add(vendor).then((res) => {
    if (res.data.status) {
      dispatch(getVendorsData());
      dispatch(getVendorAllData());
    } else {
      const message =
        res.data.message.length > 0 ? res.data.message : "Проверь BackEnd";
      dispatch(stopSubmit("vendor", { _error: message }));
      dispatch(setError(res.data.errorCode));
    }
    dispatch(toggleIsLoading(false));
  });
};
export default vendorReducer;
