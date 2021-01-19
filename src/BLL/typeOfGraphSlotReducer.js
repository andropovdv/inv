
import typeOfGraphSlotAPI from '../DAL/typeOfGraphSlotAPI';

const SET_TYPE_OF_GRAPH_SLOT = 'SET_TYPE_OF_GRAPH_SLOT';
const SET_CURRENT_TYPE_OF_GRAPH_SLOT = 'SET_CURRENT_TYPE_OF_GRAPH_SLOT';
const SET_ALL_TYPE_OF_GRAPH_SLOT = 'SET_ALL_TYPE_OF_GRAPH_SLOT';
const TYPE_OF_GRAPH_SLOT_IS_LOADING = 'TYPE_OF_GRAPH_SOLT_IS_LOADING';
const SET_ERROR_TYPE_GRAPH_SLOT = 'SET_ERROR_TYPE_GROPH_SLOT';

let initialState = {
    typeOfGraphSlot: [],
    typeAllOfGraphSlot: [],
    pagination: {},
    currentType: {},
    isLoading: true,
    errorCode: 0
}

const typeOfGraphSlotReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE_OF_GRAPH_SLOT_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_TYPE_OF_GRAPH_SLOT: {
            return {
                ...state,
                typeOfGraphSlot: [...action.typeSlot],
                pagination: {...action.pagination}
            }
        }
        case SET_CURRENT_TYPE_OF_GRAPH_SLOT: {
            return {
                ...state,
                currentType: {...action.current}
            }
        }
        case SET_ERROR_TYPE_GRAPH_SLOT: {
            return {
                ...state,
                errorCode: action.error
            }
        }
        case SET_ALL_TYPE_OF_GRAPH_SLOT: {
            return {
                ...state,
                typeAllOfGraphSlot: [...action.allTypeOfGraphSlot]
            }
        }
        default:
            return state
    }

}

// AC

export const toggleIsLoading = (isLoading) => {
    return { type: TYPE_OF_GRAPH_SLOT_IS_LOADING, isLoading }
}

export const setTypeOfGraphSlot = (typeSlot, pagination) => {
    return { type: SET_TYPE_OF_GRAPH_SLOT, typeSlot, pagination }
}

export const setCurrentTypeOfGraph = (current) => {
    return { type: SET_CURRENT_TYPE_OF_GRAPH_SLOT, current }
}

export const setError = (error) => {
    return { type: SET_ERROR_TYPE_GRAPH_SLOT, error}
}

export const setAllTypeOfGraphSlot = (allTypeOfGraphSlot) => {
    return { type: SET_ALL_TYPE_OF_GRAPH_SLOT, allTypeOfGraphSlot}
}

// THUNK

export const getTypeOfGraphSlot = (page) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfGraphSlotAPI.all(page).then(res => {
        if (res.data.status) {
            dispatch(setTypeOfGraphSlot(res.data.typeOfGraphSlot, res.data.pagination))
        }
    })
    dispatch(toggleIsLoading(false))
}

export const addTypeOfGraphSlot = (typeOfGraphSlot) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfGraphSlotAPI.add(typeOfGraphSlot).then(res => {
        if (res.data.status) {
            dispatch(getAllTypeOfGraphSlot())
            dispatch(getTypeOfGraphSlot())
        } else {
            dispatch(setError(res.data.errorCode))
        }
    })
    dispatch(toggleIsLoading(false));
}

export const updateTypeOfGraphSlot = (typeOfGraph) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    typeOfGraphSlotAPI.update(typeOfGraph).then(res => {
        if (res.data.status) {
            dispatch(getTypeOfGraphSlot());
        } else {
            dispatch(setError(res.data.errorCode))
        }
    })
    dispatch(toggleIsLoading(false))
}

export const deleteTypeOfGraphSlot = (id) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfGraphSlotAPI.delete(id).then(res => {
        if (res.data.status) {
            dispatch(getTypeOfGraphSlot())
        } else {
            dispatch(setError(res.data.errorCode))
        }
    })
    dispatch(toggleIsLoading(false))
}

export const getAllTypeOfGraphSlot = () => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfGraphSlotAPI.allToScroll().then(res => {
        if (res.data.status) {
            dispatch(setAllTypeOfGraphSlot(res.data.typeOfGraphSlot))
        }
    })
    dispatch(toggleIsLoading(false))
}


export default typeOfGraphSlotReducer;