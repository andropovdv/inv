import typeSocketCpuAPI from '../DAL/typeSocketCpuAPI';

const SET_TYPE_CPU_SOKET = 'SET_TYPE_CPU_SOKET';
const SET_ALL_TYPE_CPU_SOKET = 'SET_ALL_TYPE_CPU_SOKET';
const TYPE_CPU_SOCKET_IS_LOADING = 'TYPE_CPU_SOCKET_IS_LOADING';
const SET_CURRENT_TYPE_CPU_SOCKET = 'SET_CURREN_TYPE_CPU_SOCKET';
const SET_ERROR_TYPE_CPU_SOCKET = "SET_ERROR_TYPE_CPU_SOCKET";

let initialState = {
    cpuSockets: [],
    cpuSocketsAll: [],
    pagination: {},
    currentType: {},
    isLoading: true,
    errorCode: 0
}

const typeSocketCpuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TYPE_CPU_SOKET: {
            return {
                ...state,
                cpuSockets: [...action.cpuSockets],
                pagination: {...action.pagination}
            }
        }
        case TYPE_CPU_SOCKET_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_CURRENT_TYPE_CPU_SOCKET: {
            return {
                ...state,
                currentType: {...action.currentType}
            }
        }
        case SET_ERROR_TYPE_CPU_SOCKET: {
            return {
                ...state,
                errorCode: action.code
            }
        }
        case SET_ALL_TYPE_CPU_SOKET: {
            return {
                ...state,
                cpuSocketsAll: [...action.socketCpu]
            }
        }
        default:
            return state;
    }
}

//AC

export const toggleIsLoading = (isLoading)  => {
    return { type: TYPE_CPU_SOCKET_IS_LOADING, isLoading }
}

export const setSocketCpuData = (cpuSockets, pagination) => {
    return { type: SET_TYPE_CPU_SOKET, cpuSockets, pagination}
}

export const setAllSocketCpuData = (socketCpu)  => {
    return { type: SET_ALL_TYPE_CPU_SOKET, socketCpu}
}

export const setCurrentSocketCpu = (currentType) => {
    return { type: SET_CURRENT_TYPE_CPU_SOCKET, currentType}
}

export const setError = (code) => {
    return { type: SET_ERROR_TYPE_CPU_SOCKET, code}
}

//THUNK

export const getSocketCpuData = (page) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeSocketCpuAPI.all(page).then(res => {
        dispatch(toggleIsLoading(false))
        dispatch(setSocketCpuData(res.data.typeSoketCpus, res.data.pagination))
    })
}

export const getAllSocketCpuData = () => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeSocketCpuAPI.allToScroll().then(res => {
        if (res.data.status) {
            dispatch(toggleIsLoading(false))
            dispatch(setAllSocketCpuData(res.data.typeSocketCpus))
        }
    })
}

export const updateSocketCpuData = (updateTypeSocket) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeSocketCpuAPI.update(updateTypeSocket).then(res => {
        dispatch(toggleIsLoading(false));
        if (res.data.status) {
            dispatch(getSocketCpuData())
        }
    })
}

export const addSocketCpuData = (addTypeSocket) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeSocketCpuAPI.add(addTypeSocket).then(res => {
        if (res.data.status) {
            dispatch(getSocketCpuData());
            dispatch(getAllSocketCpuData());
        } else {
            dispatch(setError(res.data.errorCode))
        }
        dispatch(toggleIsLoading(false));
    })
}

export const deleteSoketCpuData = (id) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeSocketCpuAPI.delete(id).then(res => {
        dispatch(toggleIsLoading(false));
        if (res.data.status) {
            dispatch(getSocketCpuData())
        }
    })
}

export default typeSocketCpuReducer;
