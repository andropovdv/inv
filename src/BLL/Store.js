/* eslint-disable no-underscore-dangle */
import { applyMiddleware, combineReducers, createStore } from "redux";
import thunkMiddleware from "redux-thunk";
// import { reducer as formReducer } from "redux-form";

import authReducer from "./authReducer";
import appReducer from "./appReducer";
import vendorReducer from "./vendorReducer";
import cpuReducer from "./cpuReducer";
import typeSocketCpuReducer from "./typeSocketCpuReducer";
import modalWindowReducer from "./modalWindowReducer";
import typeOfRamReducer from "./typeOfRamReducer";
import typeOfGraphSlotReducer from "./typeOfGraphSlotReducer";
import formFactorReducer from "./formFactorReducer";
import graphCardReducer from "./graphCardReducer";
import mboardReducer from "./mboardReducer";
import errorReducer from "./errorReducer";
import typeOfSocketSdReducer from "./typeOfSocketSdReducer";
import formFactorSdReducer from "./formFactorSdReducer";
import storageDeviceReducer from "./storageDeviceReducer";

const reducers = combineReducers({
  app: appReducer,
  auth: authReducer,
  modalWindow: modalWindowReducer,
  vendor: vendorReducer,
  cpu: cpuReducer,
  typeCpuSocket: typeSocketCpuReducer,
  typeOfRam: typeOfRamReducer,
  typeOfGraphSlot: typeOfGraphSlotReducer,
  formFactor: formFactorReducer,
  graphCard: graphCardReducer,
  mboard: mboardReducer,
  // form: formReducer,
  socketSd: typeOfSocketSdReducer,
  formFactorSd: formFactorSdReducer,
  error: errorReducer,
  storageDevice: storageDeviceReducer,
});

const store = createStore(reducers, applyMiddleware(thunkMiddleware));

window.store = store;

export default store;
