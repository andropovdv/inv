import vendorAPI from '../DAL/vendorsAPI';

const VENDOR_IS_LOADING = 'VENDOR_IS LOADING';
const SET_VENDORS = 'SET_VENDORS';

let initialState = {
    vendors: [],
    isLoading: true

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
            debugger
            return {
                ...state,
                vendors: [...action.vendors]
            }
        }
        default:
            return state;
    }
}

// action creator
export const toggleIsLoading = (isLoading) => {
    return { type: VENDOR_IS_LOADING, isLoading }
}

export const setVendorsData = (vendors) => {
    return { type: SET_VENDORS, vendors}
}

// THUNK
export const getVendorsData = () => (dispatch) => {
    dispatch(toggleIsLoading(true))
    vendorAPI.all().then(res => {
        dispatch(toggleIsLoading(false))
        debugger
        dispatch(setVendorsData(res.data.result))
    })
}

export default vendorReducer;