// store.js
import { createStore } from 'redux';
import formReducer from './reducers';

const store = createStore(formReducer);

export default store;
