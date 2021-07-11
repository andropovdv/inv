/* eslint-disable camelcase */
import cpuAPI from "../DAL/cpuApi";
import { setBackEndMessage, setError } from "./errorReducer";
import { setAuthData } from "./authReducer";

const SET_CPUS = "SET_CPUS";
const CPUS_IS_LOADIND = "CPUS_IS_LOADIND";
const SET_CURRENT_CPU = "SET_CURRENT_CPU";
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

// THUNK

const mapsFields = (cpu) => {
  const newRows = cpu.map((e) => {
    const row = {};
    row.id = e.id_cpu;
    row.vendor = e.name;
    row.model = e.model;
    row.socketCpu = e.name_typeSocketCpu;
    row.freq = e.frequency;
    row.graphKernel = e.graphKernel === 1;
    return row;
  });
  return newRows;
};

const unMapsField = (cpu) => {
  let kernel = 0;
  if (cpu.graphKernel) kernel = 1;
  const apiCpu = {
    id_cpu: cpu.id,
    name: cpu.vendor,
    name_typeSocketCpu: cpu.socketCpu,
    model: cpu.model,
    frequency: cpu.freq,
    graphKernel: kernel,
  };
  return apiCpu;
};

export const getCpusData = (page, text) => async (dispatch) => {
  let search;
  if (text) {
    search = text;
  }
  dispatch(changeSearch(text));
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.all(page, search);
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setCpusData(finalRes, res.data.pagination));
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

export const updateCpusData = (cpu, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const finalData = unMapsField(cpu);
    const res = await cpuAPI.update(finalData);
    if (res.data.status) {
      dispatch(getCpusData(page, text));
      dispatch(setCurrentCpu(cpu));
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

export const deleteCpusData = (idCpu, page, text) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const response = { id_cpu: idCpu };
  try {
    const res = await cpuAPI.delete(response);
    if (res.data.status) {
      dispatch(getCpusData(page, text)); // FIXME занулить current
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

export const addCpusData = (cpu, page, text) => async (dispatch) => {
  const finalRes = unMapsField(cpu);
  dispatch(toggleIsLoading(true));
  try {
    const res = await cpuAPI.add(finalRes);
    if (res.data.status) {
      dispatch(getCpusData(page, text));
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

export default cpuReducer;
