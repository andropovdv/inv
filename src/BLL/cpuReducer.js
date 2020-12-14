import cpuAPI from '../DAL/cpuApi'

const SET_CPUS = 'SET_CPUS';
const CPUS_IS_LOADIND = 'CPUS_IS_LOADIND';
const SET_CURRENT_CPU = 'SET_CURRENT_CPU';
const SET_ERROR_CPU = 'SET_ERROR_CPU';

let initialState = {
    cpus: [],
    pagination: {},
    currentCpu: {},
    isLoading: true,
    errorCode: 0
}

const cpuReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CPUS: {
            return {
                ...state,
                cpus: [...action.cpus],
                pagination: { ...action.pagination }
            }
        }
        case CPUS_IS_LOADIND: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_CURRENT_CPU: {
            return {
                ...state,
                currentCpu: { ...action.currentCpu }
            }
        }
        case SET_ERROR_CPU: {
            debugger
            return {
                ...state,
                errorCode: action.code
            }
        }
        default:
            return state;
    }
}
// AC

export const setCurrentCpu = (currentCpu) => {
    return { type: SET_CURRENT_CPU, currentCpu }
}

export const setCpusData = (cpus, pagination) => {
    return { type: SET_CPUS, cpus, pagination }
};

export const toggleIsLoadind = (isLoading) => {
    return { type: CPUS_IS_LOADIND, isLoading }
};

export const setError = (code) => {
    return { type: SET_ERROR_CPU, code }
}

//THUNK

export const getCpusData = (page) => (dispatch) => {
    dispatch(toggleIsLoadind(true))
    dispatch(setError(0))
    cpuAPI.all(page).then(res => {
        dispatch(toggleIsLoadind(false));
        dispatch(setCpusData(res.data.cpus, res.data.pagination))
    })
}

export const updateCpusData = (cpu) => (dispatch) => {
    cpuAPI.update(cpu).then(res => {
        if (res.data.status) {
            dispatch(getCpusData())
        }
    })
}

export const deleteCpusData = (id_cpu) => (dispatch) => {
    cpuAPI.delete(id_cpu).then(res => {
        dispatch(getCpusData());
    })
}

export const addCpusData = (cpu) => (dispatch) => {
    dispatch(toggleIsLoadind(true))
    dispatch(setError(0));
    cpuAPI.add(cpu).then(res => {
        if (res.data.status) {
            dispatch(getCpusData())
        } else {
            dispatch(setError(res.data.errorCode));
        }
        dispatch(toggleIsLoadind(false))
    })
}

export default cpuReducer;