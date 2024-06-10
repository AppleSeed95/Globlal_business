import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';

import { LOGIN_SUCCESS } from './store/actions/type';

const root = ReactDOM.createRoot(document.getElementById('root'));
const savedToken = localStorage.getItem('userToken');


if (savedToken) {
  store.dispatch({ type: LOGIN_SUCCESS, payload: savedToken });
}


root.render(
  <Provider store={store}>
    <App />
  </Provider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
