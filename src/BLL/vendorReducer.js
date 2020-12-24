import vendorAPI from '../DAL/vendorAPI';

const VENDOR_IS_LOADING = 'VENDOR_IS LOADING';
const SET_VENDORS = 'SET_VENDORS';
const SET_VENDORS_ALL = 'SET_VENDORS_ALL';
const SET_CURRENT_VENDOR = 'SET_CURRENT_VENDOR';
const SET_ERROR_VENDOR = 'SET_ERROR_VENDOR';


let initialState = {
    vendors: [],
    currentVendor: {},
    vendorsAll: [],
    pagination: {},
    isLoading: true,
    errorCode: 0
    // currentVendorId: null,
    // currentVendorName: null,
    // currentVendorFullName: null
}

const vendorReducer = (state = initialState, action) => {
    switch (action.type) {
        case VENDOR_IS_LOADING: {
            return {
                ...state,
                isLoading: action.isLoading
            };
        }
        case SET_VENDORS: {
            return {
                ...state,
                vendors: [...action.vendors],
                pagination: { ...action.pagination }
            };
        }
        case SET_VENDORS_ALL: {
            return {
                ...state,
                vendorsAll: [...action.vendors]
            }
        }
        case SET_CURRENT_VENDOR: {
            return {
                ...state,
                currentVendor: { ...action.currentVendor }
            };
        }
        case SET_ERROR_VENDOR: {
            return {
                ...state,
                errorCode: action.code
            }
        }
        default:
            return state;
    }
}

// AS
export const toggleIsLoading = (isLoading) => {
    return { type: VENDOR_IS_LOADING, isLoading }
}

export const setVendorsData = (vendors, pagination) => {
    return { type: SET_VENDORS, vendors, pagination }
}

export const setVendorsAllData = (vendors) => {
    return { type: SET_VENDORS_ALL, vendors }
}
export const setCurrentVendor = (currentVendor) => {
    return {
        type: SET_CURRENT_VENDOR, currentVendor
    }
}

export const setError = (code) => {
    return { type: SET_ERROR_VENDOR, code }
}


// THUNK
export const getVendorsData = (page) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    vendorAPI.all(page).then(res => {
        dispatch(toggleIsLoading(false))
        dispatch(setVendorsData(res.data.vendors, res.data.pagination))
    })
}

export const getVendorAllData = (vendors) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    vendorAPI.allToScroll().then(res => {
        if (res.data.status) {
            dispatch(toggleIsLoading(false))
            dispatch(setVendorsAllData(res.data.vendors))
        }
    })
}

export const updateVendorData = (updateVendor) => (dispatch) => {
    vendorAPI.update(updateVendor).then(res => {
        if (res.data.status) {
            dispatch(getVendorsData());
        }
    })
}

export const deleteVendorData = (idVendor) => (dispatch) => {
    vendorAPI.delete(idVendor).then(res => {
        if (res.data.status) {
            dispatch(getVendorsData());
        }
    })
}

export const addVendorData = (vendor) => (dispatch) => {
    dispatch(toggleIsLoading(true));
    vendorAPI.add(vendor).then(res => {
        if (res.data.status) {
            dispatch(getVendorsData());
            dispatch(getVendorAllData())
        } else {
            dispatch(setError(res.data.errorCode))
        }
        dispatch(toggleIsLoading(false))
    })
}
export default vendorReducer;