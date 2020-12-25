

const SET_VISIBILITY_CPU_SOKET = 'SET_VISIBILITY_CPU_SOKET';
const SET_VISIBILITY_VENDOR = 'SET_VISIBILITY_VENDOR';
const SET_VISIBILITY_TYPE_OF_RAM = 'SET_VISIBILITY_TYPE_OF_RAM';

let initialState = {
    cpuSocketVisibility: false,
    vendorVisibility: false,
    typeOfRamVisibility: false
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
        case SET_VISIBILITY_TYPE_OF_RAM: {
            return {
                ...state,
                typeOfRamVisibility: action.visibility
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

export const setTypeOfRamVisibility = (visibility) => {
    return { type: SET_VISIBILITY_TYPE_OF_RAM, visibility}
}

export default modalWindowReducer;