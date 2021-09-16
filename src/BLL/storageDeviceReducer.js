/* eslint-disable no-debugger */
import { setBackEndMessage, setError } from "./errorReducer";
import storageDeviceAPI from "../DAL/storageDeviceAPI";
import { setAuthData } from "./authReducer";

const SET_STORAGE_DEVICE = "SET_STORAGE_DEVICE";
const SET_ALL_STORAGE_DEVICE = "SET_ALL_STORAGE_DEVICE";
const SET_CURRENT_STORAGE_DEVICE = "SET_CURRENT_STORAGE_DEVICE";
const LOADING_STORAGE_DEVICE = "LOADING_STORAGE_DEVICE";
const SEARCH_STORAGE_DEVICE = "SEARCH_STORAGE_DEVICE";

const initialState = {
  storageDevice: [],
  storageDeviceAll: [],
  pagination: {},
  current: {},
  isLoading: false,
  searchField: "",
};

const storageDeviceReducer = (state = initialState, action) => {
  switch (action.type) {
    case LOADING_STORAGE_DEVICE: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_STORAGE_DEVICE: {
      return {
        ...state,
        storageDevice: [...action.storageDevice],
        pagination: { ...action.pagination },
      };
    }
    case SET_ALL_STORAGE_DEVICE: {
      return {
        ...state,
        storageDeviceAll: [...action.storageDeviceAll],
      };
    }
    case SET_CURRENT_STORAGE_DEVICE: {
      return {
        ...state,
        current: { ...action.current },
      };
    }
    case SEARCH_STORAGE_DEVICE: {
      return {
        ...state,
        searchField: action.searchField,
      };
    }
    default:
      return state;
  }
};

export const setStorageDevice = (storageDevice, pagination) => ({
  type: SET_STORAGE_DEVICE,
  storageDevice,
  pagination,
});

export const setAllStorageDevice = (storageDeviceAll) => ({
  type: SET_ALL_STORAGE_DEVICE,
  storageDeviceAll,
});

export const setCurrentStorageDevice = (current) => ({
  type: SET_CURRENT_STORAGE_DEVICE,
  current,
});

export const toggleIsLoading = (isLoading) => ({
  type: LOADING_STORAGE_DEVICE,
  isLoading,
});

export const changeSearch = (searchField) => ({
  type: SEARCH_STORAGE_DEVICE,
  searchField,
});

const mapFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.idStorageDevice;
    row.vendor = e.name;
    row.model = e.model;
    row.volume = e.volume;
    row.socket = e.socketSD;
    row.formFactor = e.formFactorSD;
    row.create = e.created_at;
    row.update = e.updated_at;
    return row;
  });
  return newRows;
};

const unMapFields = (data) => {
  const storage = {
    idStorageDevice: data.id,
    name: data.vendor,
    model: data.model,
    volume: data.volume,
    socketSD: data.socket,
    formFactorSD: data.formFactor,
  };
  return storage;
};

export const getStorageDevice = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(toggleIsLoading(true));
  try {
    const res = await storageDeviceAPI.all(page, search);
    if (res.data.status) {
      dispatch(
        setStorageDevice(mapFields(res.data.result), res.data.pagination)
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

export const getAllStorageDevice = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await storageDeviceAPI.allToScroll();
    if (res.data.status) {
      dispatch(setAllStorageDevice(mapFields(res.data.result)));
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

export const deleteStorageDevice = (id, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const req = { idStorageDevice: id };
  try {
    const res = await storageDeviceAPI.delete(req);
    if (res.data.status) {
      dispatch(getStorageDevice(page, text));
      dispatch(getAllStorageDevice());
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

export const addStorageDevice = (storage, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const finalRes = unMapFields(storage);
  try {
    const res = await storageDeviceAPI.add(finalRes);
    if (res.data.status) {
      debugger;
      dispatch(getStorageDevice(page, text));
      dispatch(getAllStorageDevice());
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
    debugger;
    dispatch(toggleIsLoading(false));
  }
};

export const updateStorageDevice = (storage, page, text) => async (
  dispatch
) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await storageDeviceAPI.update(unMapFields(storage));
    if (res.data.status) {
      dispatch(getStorageDevice(page, text));
      dispatch(getAllStorageDevice());
      dispatch(
        setCurrentStorageDevice({
          ...storage,
          volume: parseInt(storage.volume, 10),
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

export default storageDeviceReducer;
