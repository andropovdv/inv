
import formFactorAPI from '../DAL/formFactorAPI';

const SET_FORM_FACTOR = 'SET_FORM_FACTOR';
const FORM_FACTOR_IS_LOADING = 'FORM_FACTOR_IS_LOADING';
const SET_CURRENT_FORM_FACTOR = 'SET_CURRENT_FORM_FACTOR';
const SET_ERROR_FORM_FACTOR = 'SET_ERROR_FORM_FACTOR';
const SET_ALL_FORM_FACTOR = 'SET_ALL_FORM_FACTOR';

let initialState = {
    formFactor: [],
    allFormFactor: [],
    pagination: {},
    currentType: {},
    isLoading: false,
    errorCode: 0
}

const formFactorReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_ALL_FORM_FACTOR: {
            return {
                ...state,
                allFormFactor: [...action.formFactor]
            }
        }
        case SET_ERROR_FORM_FACTOR: {
            return {
                ...state,
                errorCode: action.error
            }
        }
        case SET_CURRENT_FORM_FACTOR: {
            return {
                ...state,
                currentType: { ...action.current }
            }
        }
        case SET_FORM_FACTOR: {
            return {
                ...state,
                formFactor: [...action.formFactor],
                pagination: { ...action.pagination }
            }
        }
        case FORM_FACTOR_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            }
        }
        default:
            return state
    }
}

// AC

const setAllFormFactor = (formFactor) => {
    return {
        type: SET_ALL_FORM_FACTOR, formFactor
    }
}

const togggleIsLoading = (isLoading) => {
    return {
        type: FORM_FACTOR_IS_LOADING, isLoading
    }
}

export const setFormFactor = (formFactor, pagination) => {
    return {
        type: SET_FORM_FACTOR, formFactor, pagination
    }
}

export const setCurrentFormFactor = (current) => {
    return {
        type: SET_CURRENT_FORM_FACTOR, current
    }
}

export const setError = (error) => {
    return {
        type: SET_ERROR_FORM_FACTOR, error
    }
}

// THUNK

export const getFormFactor = (page) => (dispatch) => {
    dispatch(togggleIsLoading(true));
    formFactorAPI.all(page).then(res => {
        if (res.data.status) {
            dispatch(setFormFactor(res.data.formFactor, res.data.pagination))
        }
    })
    dispatch(togggleIsLoading(false))
}

export const addFormFactor = (formFactor) => (dispatch) => {
    dispatch(togggleIsLoading(true));
    formFactorAPI.add(formFactor).then(res => {
        if (res.data.status) {
            dispatch(getFormFactor());
            dispatch(getAllFormFactor());
        } else {
            dispatch(setError(res.data.errorCode))
        }
    })
    dispatch(togggleIsLoading(false))
}

export const updateFormFactor = (formFactor) => (dispatch) => {
    dispatch(togggleIsLoading(true));
    formFactorAPI.update(formFactor).then(res => {
        if (res.data.status) {
            dispatch(getFormFactor());
            dispatch(getAllFormFactor());
        }
    })
    dispatch(togggleIsLoading(false));
}

export const deleteFormFactor = (id) => (dispatch) => {
    dispatch(togggleIsLoading(true));
    formFactorAPI.delete(id).then(res => {
        if (res.data.status) {
            dispatch(getFormFactor())
        }
    })
    dispatch(togggleIsLoading(false));
}

export const getAllFormFactor = () => (dispatch) => {
    dispatch(togggleIsLoading(true));
    formFactorAPI.allToScroll().then(res => {
        if (res.data.status) {
            dispatch(setAllFormFactor(res.data.formFactor))
        }
    })
    dispatch(togggleIsLoading(false));
}

export default formFactorReducer;