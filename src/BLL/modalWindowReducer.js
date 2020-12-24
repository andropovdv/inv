

const SET_VISIBILITY_CPU_SOKET = 'SET_VISIBILITY_CPU_SOKET';
const SET_VISIBILITY_VENDOR = 'SET_VISIBILITY_VENDOR';

let initialState = {
    cpuSocketVisibility: false,
    vendorVisibility: false
}

const modalWindowReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_VISIBILITY_CPU_SOKET: {
            return {
                ...state,
                cpuSocketVisibility: action.visibility
            }
        }
        case SET_VISIBILITY_VENDOR: {
            return {
                ...state,
                vendorVisibility: action.visibility
            }
        }
        default:
            return state;
    }
}

export const setCpuSoketVisibility = (visibility) => {
    return { type: SET_VISIBILITY_CPU_SOKET, visibility}
}

export const setVendorVisibility = (visibility) => {
    return { type: SET_VISIBILITY_VENDOR, visibility}
}

export default modalWindowReducer;