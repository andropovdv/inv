import vendorAPI from '../DAL/vendorsAPI';

const VENDOR_IS_LOADING = 'VENDOR_IS LOADING';
const SET_VENDORS = 'SET_VENDORS';
const SET_CURRENT_VENDOR = 'SET_CURRENT_VENDOR';


let initialState = {
    vendors: [],
    pagination: {},
    isLoading: true,
    currentVendorId: null,
    currentVendorName: null,
    currentVendorFullName: null
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
                pagination: {...action.pagination}
            };
        }
        case SET_CURRENT_VENDOR: {
            return {
                ...state,
                currentVendorId: action.id_vendor,
                currentVendorName: action.name,
                currentVendorFullName: action.full_name
            };
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

export const setCurrentVendor = (id_vendor, name, full_name) => {
    return {
        type: SET_CURRENT_VENDOR, id_vendor: id_vendor, name: name, full_name: full_name
    }
}


// THUNK
export const getVendorsData = (page) => (dispatch) => {
    dispatch(toggleIsLoading(true))
    vendorAPI.all(page).then(res => {
        dispatch(toggleIsLoading(false))
        dispatch(setVendorsData(res.data.vendors, res.data.pagination))
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
    vendorAPI.add(vendor).then(res => {
        if (res.data.status) {
            dispatch(getVendorsData());
        }
    })
}
export default vendorReducer;