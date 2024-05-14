import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import rootReducer from './reducer'; // Assuming you have a root reducer defined

import App from './App'; // Assuming this is your root component

// Create the Redux store
const store = createStore(rootReducer);

// Wrap your root component with the Provider and pass the Redux store as a prop
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);
