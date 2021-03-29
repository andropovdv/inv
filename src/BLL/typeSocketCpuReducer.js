import typeSocketCpuAPI from "../DAL/typeSocketCpuAPI";

const SET_TYPE_CPU_SOKET = "SET_TYPE_CPU_SOKET";
const SET_ALL_TYPE_CPU_SOKET = "SET_ALL_TYPE_CPU_SOKET";
const TYPE_CPU_SOCKET_IS_LOADING = "TYPE_CPU_SOCKET_IS_LOADING";
const SET_CURRENT_TYPE_CPU_SOCKET = "SET_CURREN_TYPE_CPU_SOCKET";
const SET_ERROR_TYPE_CPU_SOCKET = "SET_ERROR_TYPE_CPU_SOCKET";
const SET_SOCKETCPU_MESSAGE = "SET_SOCKETCPU_MESSAGE";

const initialState = {
  cpuSockets: [],
  cpuSocketsAll: [],
  pagination: {},
  currentType: {},
  isLoading: true,
  errorCode: null,
  backEndMessage: "",
};

const typeSocketCpuReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_TYPE_CPU_SOKET: {
      return {
        ...state,
        cpuSockets: [...action.cpuSockets],
        pagination: { ...action.pagination },
      };
    }
    case TYPE_CPU_SOCKET_IS_LOADING: {
      return {
        ...state,
        isLoading: action.isLoading,
      };
    }
    case SET_CURRENT_TYPE_CPU_SOCKET: {
      return {
        ...state,
        currentType: { ...action.currentType },
      };
    }
    case SET_ERROR_TYPE_CPU_SOCKET: {
      return {
        ...state,
        errorCode: action.code,
      };
    }
    case SET_ALL_TYPE_CPU_SOKET: {
      return {
        ...state,
        cpuSocketsAll: [...action.socketCpu],
      };
    }
    case SET_SOCKETCPU_MESSAGE: {
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

export const setBackEndMessage = (message) => {
  return { type: SET_SOCKETCPU_MESSAGE, message };
};

export const toggleIsLoading = (isLoading) => {
  return { type: TYPE_CPU_SOCKET_IS_LOADING, isLoading };
};

export const setSocketCpuData = (cpuSockets, pagination) => {
  return { type: SET_TYPE_CPU_SOKET, cpuSockets, pagination };
};

export const setAllSocketCpuData = (socketCpu) => {
  return { type: SET_ALL_TYPE_CPU_SOKET, socketCpu };
};

export const setCurrentSocketCpu = (currentType) => {
  return { type: SET_CURRENT_TYPE_CPU_SOCKET, currentType };
};

export const setError = (code) => {
  return { type: SET_ERROR_TYPE_CPU_SOCKET, code };
};

// THUNK

const mapsFields = (resApi) => {
  const newRows = resApi.map((e) => {
    const row = {};
    row.id = e.id_typeSocketCpu;
    row.socketCpu = e.name_typeSocketCpu;
    return row;
  });
  return newRows;
};

export const getSocketCpuData = (page) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const res = await typeSocketCpuAPI.all(page);
  try {
    if (res.data.status) {
      const finalRes = mapsFields(res.data.result);
      dispatch(setSocketCpuData(finalRes, res.data.pagination));
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

export const getAllSocketCpuData = () => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  const res = await typeSocketCpuAPI.allToScroll();
  if (res.data.status) {
    const newRows = res.data.result.map((e) => {
      const row = {};
      row.id = e.id_typeSocketCpu;
      row.label = e.name_typeSocketCpu;
      return row;
    });
    await dispatch(setAllSocketCpuData(newRows));
    dispatch(toggleIsLoading(false));
  } else {
    dispatch(setError(res.data.errorCode));
    dispatch(setBackEndMessage(res.data.message));
    dispatch(toggleIsLoading(false));
  }
};

export const addSocketCpuData = (socket) => async (dispatch) => {
  const newObj = {
    name_typeSocketCpu: socket.socketCpu,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeSocketCpuAPI.add(newObj);
    if (res.data.status) {
      dispatch(getSocketCpuData());
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

export const updateSocketCpuData = (socket) => async (dispatch) => {
  const newObj = {
    id_typeSocketCpu: socket.id,
    name_typeSocketCpu: socket.socketCpu,
  };
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeSocketCpuAPI.update(newObj);
    if (res.data.status) {
      dispatch(getSocketCpuData());
      dispatch(getAllSocketCpuData());
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

export const deleteSoketCpuData = (id) => async (dispatch) => {
  dispatch(toggleIsLoading(true));
  try {
    const res = await typeSocketCpuAPI.delete(id);
    if (res.data.status) {
      dispatch(getSocketCpuData());
      dispatch(toggleIsLoading(false));
    } else {
      dispatch(setError(res.data.errorCode));
      dispatch(setBackEndMessage(res.data.message));
      dispatch(toggleIsLoading(false));
    }
  } catch (e) {
    console.info(e);
    dispatch(setError(500));
    dispatch(setBackEndMessage(e.message));
    dispatch(toggleIsLoading(false));
  }
};

export default typeSocketCpuReducer;
