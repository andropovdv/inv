import typeOfRamAPI from '../DAL/typeOfRamAPI';

const SET_TYPE_OF_RAM = 'SET_TYPE_OF_RAM';
const SET_CURRENT_TYPE_OF_RAM = 'SET_CURRENT_TYPE_OF_RAM';
const SET_ERROR_TYPE_OF_RAM = 'SET_ERROR_TYPE_OF_RAM';
const TYPE_OF_RAM_IS_LOADING = 'TYPE_OF_RAM_IS_LOADING';

let initialState = {
    typeOfRam: [],
    typeOfRamAll: [],
    pagination: {},
    currentType: {},
    isLoading: true,
    errorCode: 0
}

const typeOfRamReducer = (state = initialState, action) => {
    switch (action.type) {
        case TYPE_OF_RAM_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        case SET_ERROR_TYPE_OF_RAM: {
            return {
                ...state,
                errorCode: action.error
            }
        }
        case SET_TYPE_OF_RAM: {
            return {
                ...state,
                typeOfRam: [...action.typeOfRam],
                pagination: { ...action.pagination }
            }
        }
        case SET_CURRENT_TYPE_OF_RAM: {
            return {
                ...state,
                currentType: { ...action.current }
            }
        }
        default:
            return state
    }
}


//ac
export const setTypeOfRamData = (typeOfRam, pagination) => {
    return { type: SET_TYPE_OF_RAM, typeOfRam, pagination }
}

export const setCurrentTypeOfRam = (current) => {
    return { type: SET_CURRENT_TYPE_OF_RAM, current }
}

export const toggleIsLoading = (isLoading) => {
    return { type: TYPE_OF_RAM_IS_LOADING, isLoading }
}

export const setErrorCode = (error) => {
    return { type: SET_ERROR_TYPE_OF_RAM, error }
}
//thunk

export const getTypeOfRamData = (page) => (dispatch) => {
    dispatch(toggleIsLoading);
    typeOfRamAPI.all(page).then(res => {
        dispatch(setTypeOfRamData(res.data.typeOfRam, res.data.pagination));
        dispatch(toggleIsLoading(false));
    })
}

export const addTypeOfRamData = (typeOfRam) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfRamAPI.add(typeOfRam).then(res => {
        if (res.data.status) {
            dispatch(getTypeOfRamData());
        } else {
            dispatch(setErrorCode(res.data.errorCode));
        }
        dispatch(toggleIsLoading(false));
    })
}

export const updateTypeOfRamData = (typeOfRam) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfRamAPI.update(typeOfRam).then(res => {
        if (res.data.status) {
            dispatch(getTypeOfRamData());
        }
        dispatch(toggleIsLoading(false));
    })
}

export const deleteTypeOfRamData = (id) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    typeOfRamAPI.delete(id).then(res => {
        if (res.data.status) {
            dispatch(getTypeOfRamData());
        }
        dispatch(toggleIsLoading(false))
    })
}

export default typeOfRamReducer;