const SET_VISIBILITY_CPU_SOKET = "SET_VISIBILITY_CPU_SOKET";
const SET_VISIBILITY_VENDOR = "SET_VISIBILITY_VENDOR";
const SET_VISIBILITY_TYPE_OF_RAM = "SET_VISIBILITY_TYPE_OF_RAM";
const SET_VISIBILITY_TYPE_OF_GRAPH_SLOT = "SET_VISIBILITY_TYPE_OF_GRAPH_SLOT";
const SET_VISIBILITY_FORM_FACTOR = "SET_VISIBILITY_FORM_FACTOR";
const SET_VISIBILITY_GRAPH_CARD = "SET_VISIBILITY_GRAPH_CARD";
const SET_VISIBILITY_CPU = "SET_VISIBILITY_CPU";
const SET_VISIBILITY_MBOARD = "SET_VISIBILITY_MBOARD";

const initialState = {
  cpuSocketVisibility: { type: null, header: null, visibility: false },
  vendorVisibility: { type: null, header: null, visibility: false },
  cpuVisibility: { type: null, header: null, visibility: false },
  typeOfRamVisibility: { type: null, header: null, visibility: false },
  typeOfGraphSlotVisibility: { type: null, header: null, visibility: false },
  formFactorVisibility: { type: null, header: null, visibility: false },
  graphCardVisibility: false,
  mboardVisibility: { type: null, header: null, visibility: false },
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
        cpuVisibility: { ...action.modal },
      };
    }
    case SET_VISIBILITY_FORM_FACTOR: {
      return {
        ...state,
        formFactorVisibility: { ...action.modal },
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
        vendorVisibility: { ...action.modal },
      };
    }
    case SET_VISIBILITY_TYPE_OF_RAM: {
      return {
        ...state,
        typeOfRamVisibility: { ...action.modal },
      };
    }
    case SET_VISIBILITY_TYPE_OF_GRAPH_SLOT: {
      return {
        ...state,
        typeOfGraphSlotVisibility: { ...action.modal },
      };
    }
    case SET_VISIBILITY_MBOARD: {
      return {
        ...state,
        mboardVisibility: { ...action.modal },
      };
    }
    default:
      return state;
  }
};

export const setMboardVisibility = (modal) => ({
  type: SET_VISIBILITY_MBOARD,
  modal,
});

export const setGraphCardVisibility = (visibility) => {
  return { type: SET_VISIBILITY_GRAPH_CARD, visibility };
};

export const setCpuSoketVisibility = (modal) => {
  return { type: SET_VISIBILITY_CPU_SOKET, modal };
};

export const setVendorVisibility = (modal) => {
  return { type: SET_VISIBILITY_VENDOR, modal };
};

export const setTypeOfRamVisibility = (modal) => {
  return { type: SET_VISIBILITY_TYPE_OF_RAM, modal };
};

export const setTypeOfGraphSlotVisibility = (modal) => {
  return { type: SET_VISIBILITY_TYPE_OF_GRAPH_SLOT, modal };
};

export const setFormFactorVisibility = (modal) => {
  return { type: SET_VISIBILITY_FORM_FACTOR, modal };
};

export const setCpuVisibility = (modal) => {
  return { type: SET_VISIBILITY_CPU, modal };
};
export default modalWindowReducer;
