import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import appReducer from './appReducer';
import vendorReducer from './vendorReducer';
import cpuReducer from './cpuReducer';
import typeSocketCpuReducer from './typeSocketCpuReducer';
import modalWindowReducer from './modalWindowReducer';

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    modalWindow: modalWindowReducer,
    vendor: vendorReducer,
    cpu: cpuReducer,
    typeCpuSocket: typeSocketCpuReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;