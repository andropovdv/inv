/* eslint-disable camelcase */
import cpuAPI from "../DAL/cpuApi";

const SET_CPUS = "SET_CPUS";
const CPUS_IS_LOADIND = "CPUS_IS_LOADIND";
const SET_CURRENT_CPU = "SET_CURRENT_CPU";
const SET_ERROR_CPU = "SET_ERROR_CPU";
const SET_CPU_MESSAGE = "SET_CPU_MESSAGE";
const SEARCH_CPU = "SEARCH_CPU";

const initialState = {
  cpus: [],
  pagination: {},
  currentCpu: {},
  isLoading: true,
  errorCode: null,
  backEndMessage: "",
  searchField: "",
};

const cpuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_CPUS: {
      return {
        ...state,
        cpus: [...action.cpus],
        pagination: { ...action.pagination },
      };
    }
    case CPUS_IS_LOADIND: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_CURRENT_CPU: {
      return {
        ...state,
        currentCpu: { ...action.currentCpu },
      };
    }
    case SET_ERROR_CPU: {
      return {
        ...state,
        errorCode: action.code,
      };
    }
    case SET_CPU_MESSAGE: {
      return {
        ...state,
        backEndMessage: action.message,
      };
    }
    case SEARCH_CPU: {
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

export const changeSearch = (text) => {
  return { type: SEARCH_CPU, text };
};

export const setCurrentCpu = (currentCpu) => {
  return { type: SET_CURRENT_CPU, currentCpu };
};

export const setCpusData = (cpus, pagination) => {
  return { type: SET_CPUS, cpus, pagination };
};

export const toggleIsLoading = (isLoading) => {
  return { type: CPUS_IS_LOADIND, isLoading };
};

export const setError = (code) => {
  return { type: SET_ERROR_CPU, code };
};

export const setBackEndMessage = (message) => {
  return { type: SET_CPU_MESSAGE, message };
};
// THUNK

export const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.id_cpu;
    row.name = e.name;
    row.model = e.model;
    row.socketCpu = e.name_typeSocketCpu;
    row.freq = e.frequency;
    return row;
  });
  return newRows;
};

export const getCpusData = (page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.all(page, text);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setCpusData(finalRes, res.data.pagination));
      dispatch(toggleIsLoading(false));
    } else {
      dispatch(setBackEndMessage(res.data.message));
      dispatch(toggleIsLoading(false));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
    dispatch(toggleIsLoading(false));
  }
};

export const updateCpusData = (cpu, page, text) => async (dispatch) => {
  const newObj = {
    vendor: cpu.name,
    model: cpu.model,
    name_typeSocketCpu: cpu.socketCpu,
    id_cpu: cpu.id,
    frequency: cpu.freq,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.update(newObj);
    if (res.data.status) {
      dispatch(getCpusData(page, text));
      dispatch(setCurrentCpu(cpu));
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

export const deleteCpusData = (id_cpu, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.delete(id_cpu);
    if (res.data.status) {
      dispatch(getCpusData(page, text));
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
  cpuAPI.delete(id_cpu).then(() => {
    dispatch(getCpusData());
  });
};

export const addCpusData = (cpu, page, text) => async (dispatch) => {
  const newObj = {
    vendor: cpu.vendor,
    model: cpu.model,
    name_typeSocketCpu: cpu.socket,
    frequency: cpu.freq,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.add(newObj);
    if (res.data.status) {
      dispatch(getCpusData(page, text));
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

export const getSearchCpu = (text, page) => async (dispatch) => {
  if (text.length >= 3) {
    dispatch(toggleIsLoading(true));
    try {
      const res = await cpuAPI.all(page, text);
      if (res.data.status) {
        const finalRes = mapsFields(res.data.result);
        dispatch(setCpusData(finalRes, res.data.pagination));
        dispatch(changeSearch(text));
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
  } else {
    dispatch(changeSearch(text));
    dispatch(getCpusData());
  }
};

export default cpuReducer;
