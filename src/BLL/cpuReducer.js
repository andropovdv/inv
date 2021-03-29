/* eslint-disable camelcase */
import cpuAPI from "../DAL/cpuApi";

const SET_CPUS = "SET_CPUS";
const CPUS_IS_LOADIND = "CPUS_IS_LOADIND";
const SET_CURRENT_CPU = "SET_CURRENT_CPU";
const SET_ERROR_CPU = "SET_ERROR_CPU";
const SET_CPU_MESSAGE = "SET_CPU_MESSAGE";

const initialState = {
  cpus: [],
  pagination: {},
  currentCpu: {},
  isLoading: true,
  errorCode: null,
  backEndMessage: "",
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
    default:
      return state;
  }
};
// AC

export const setCurrentCpu = (currentCpu) => {
  return { type: SET_CURRENT_CPU, currentCpu };
};

export const setCpusData = (cpus, pagination) => {
  return { type: SET_CPUS, cpus, pagination };
};

export const toggleIsLoadind = (isLoading) => {
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
    return row;
  });
  return newRows;
};

export const getCpusData = (page) => async (dispatch) => {
  dispatch(toggleIsLoadind(true));
  const res = await cpuAPI.all(page);
  if (res.data.status) {
    const finalRes = mapsFields(res.data.result);
    dispatch(setCpusData(finalRes, res.data.pagination));
    dispatch(toggleIsLoadind(false));
  } else {
    dispatch(setBackEndMessage(res.data.message));
    dispatch(toggleIsLoadind(false));
  }
};

export const updateCpusData = (cpu) => (dispatch) => {
  cpuAPI.update(cpu).then((res) => {
    if (res.data.status) {
      dispatch(getCpusData());
      dispatch(setCurrentCpu(cpu));
    }
  });
};

export const deleteCpusData = (id_cpu) => (dispatch) => {
  cpuAPI.delete(id_cpu).then(() => {
    dispatch(getCpusData());
  });
};

export const addCpusData = (cpu) => async (dispatch) => {
  const newObj = {
    vendor: cpu.vendor,
    model: cpu.model,
    name_typeSocketCpu: cpu.socket,
  };
  dispatch(toggleIsLoadind(true));
  try {
    const res = await cpuAPI.add(newObj);
    if (res.data.status) {
      dispatch(getCpusData());
      dispatch(toggleIsLoadind)(false);
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
      dispatch(toggleIsLoadind(false));
    }
  } catch (e) {
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
    dispatch(toggleIsLoadind(false));
  }
};

export default cpuReducer;
