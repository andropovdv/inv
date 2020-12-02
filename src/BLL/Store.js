import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { reducer as formReducer } from 'redux-form';

import authReducer from './authReducer';
import appReducer from './appReducer';
import vendorReducer from './vendorReducer';

let reducers = combineReducers({
    app: appReducer,
    auth: authReducer,
    vendor: vendorReducer,
    form: formReducer
});

let store = createStore(reducers, applyMiddleware(thunkMiddleware));

export default store;