// import { stopSubmit } from "redux-form";
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
  errorCode: null,
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

export const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.id_vendor;
    row.name = e.name;
    row.full = e.full_name;
    row.url = e.url;
    return row;
  });
  return newRows;
};

export const getSearchData = (text) => (dispatch) => {
  if (text.length > 3) {
    dispatch(toggleIsLoading(true));
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
    const finalRes = mapsFields(res.data.vendors);
    dispatch(setVendorsData(finalRes, res.data.pagination));
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
  const newObj = {
    id_vendor: updateVendor.id,
    name: updateVendor.name,
    full_name: updateVendor.full,
    url: updateVendor.url,
  };
  dispatch(toggleIsLoading(true));
  vendorAPI.update(newObj).then((res) => {
    if (res.data.status) {
      dispatch(getVendorsData());
    }
  });
  dispatch(toggleIsLoading(false));
};

export const deleteVendorData = (deleteVendor) => (dispatch) => {
  const newObj = {
    id_vendor: deleteVendor.id,
  };
  dispatch(toggleIsLoading(true));
  vendorAPI.delete(newObj).then((res) => {
    if (res.data.status) {
      dispatch(getVendorsData());
    }
  });
  dispatch(toggleIsLoading(false));
};

// export const addVendorData = (vendor) => (dispatch) => {
//   const newObj = {
//     name: vendor.name,
//     full_name: vendor.full,
//     url: vendor.url,
//   };
//   dispatch(toggleIsLoading(true));
//   vendorAPI
//     .add(newObj)
//     .then((res) => {
//       if (res.data.status) {
//         dispatch(getVendorsData());
//         dispatch(getVendorAllData());
//         // return undefined;
//       } else {
//         console.log(`установка ошибки ${res.data.errorCode}`);
//         dispatch(setError(res.data.errorCode));
//         dispatch(toggleIsLoading(false));
//       }
//       // dispatch(toggleIsLoading(false));
//       // const message =
//       //   res.data.message.length > 0 ? res.data.message : "Проверь BackEnd";
//       // dispatch(stopSubmit("vendor", { _error: message }));

//       // const eCode = res.data.errorCode;
//       // return eCode;
//     })
//     .then(() => {
//       dispatch(toggleIsLoading(false));
//     });
// };

export const addVendorData = (vendor) => (dispatch) => {
  const newObj = {
    name: vendor.name,
    full_name: vendor.full,
    url: vendor.url,
  };
  dispatch(toggleIsLoading(true));
  return new Promise((resolve) => {
    vendorAPI.add(newObj).then((res) => {
      if (res.data.status) {
        console.log("status - true");
        dispatch(getVendorsData());
        dispatch(getVendorAllData());
      } else {
        console.log(`promise ${res.data.errorCode}`);
        dispatch(setError(res.data.errorCode));
      }
      dispatch(toggleIsLoading(false));
      resolve(res.data);
    });
  });
};

export default vendorReducer;
