const SET_VISIBILITY_CPU_SOKET = "SET_VISIBILITY_CPU_SOKET";
const SET_VISIBILITY_VENDOR = "SET_VISIBILITY_VENDOR";
const SET_VISIBILITY_TYPE_OF_RAM = "SET_VISIBILITY_TYPE_OF_RAM";
const SET_VISIBILITY_TYPE_OF_GRAPH_SLOT = "SET_VISIBILITY_TYPE_OF_GRAPH_SLOT";
const SET_VISIBILITY_FORM_FACTOR = "SET_VISIBILITY_FORM_FACTOR";
const SET_VISIBILITY_GRAPH_CARD = "SET_VISIBILITY_GRAPH_CARD";
const SET_VISIBILITY_CPU = "SET_VISIBILITY_CPU";

const initialState = {
  cpuSocketVisibility: { type: null, header: null, visibility: false },
  vendorVisibility: false,
  cpuVisibility: false,
  typeOfRamVisibility: false,
  typeOfGraphSlotVisibility: false,
  formFactorVisibility: false,
  graphCardVisibility: false,
};

const modalWindowReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_VISIBILITY_GRAPH_CARD: {
      return {
        ...state,
        graphCardVisibility: action.visibility,
      };
    }
    case SET_VISIBILITY_CPU: {
      return {
        ...state,
        cpuVisibility: action.visibility,
      };
    }
    case SET_VISIBILITY_FORM_FACTOR: {
      return {
        ...state,
        formFactorVisibility: action.visibility,
      };
    }
    case SET_VISIBILITY_CPU_SOKET: {
      return {
        ...state,
        cpuSocketVisibility: { ...action.modal },
      };
    }
    case SET_VISIBILITY_VENDOR: {
      return {
        ...state,
        vendorVisibility: action.visibility,
      };
    }
    case SET_VISIBILITY_TYPE_OF_RAM: {
      return {
        ...state,
        typeOfRamVisibility: action.visibility,
      };
    }
    case SET_VISIBILITY_TYPE_OF_GRAPH_SLOT: {
      return {
        ...state,
        typeOfGraphSlotVisibility: action.visibility,
      };
    }
    default:
      return state;
  }
};

export const setGraphCardVisibility = (visibility) => {
  return { type: SET_VISIBILITY_GRAPH_CARD, visibility };
};

export const setCpuSoketVisibility = (modal) => {
  return { type: SET_VISIBILITY_CPU_SOKET, modal };
};

export const setVendorVisibility = (visibility) => {
  return { type: SET_VISIBILITY_VENDOR, visibility };
};

export const setTypeOfRamVisibility = (visibility) => {
  return { type: SET_VISIBILITY_TYPE_OF_RAM, visibility };
};

export const setTypeOfGraphSlotVisibility = (visibility) => {
  return { type: SET_VISIBILITY_TYPE_OF_GRAPH_SLOT, visibility };
};

export const setFormFactorVisinility = (visibility) => {
  return { type: SET_VISIBILITY_FORM_FACTOR, visibility };
};

export const setCpuVisibility = (visibility) => {
  return { type: SET_VISIBILITY_CPU, visibility };
};
export default modalWindowReducer;
