import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import 'sanitize.css';
import store from './reducers';
import * as serviceWorker from './serviceWorker';
import App from './components/app';

/* debugging */
declare global {
  interface Window {
    store: any;
  }
}
window.store = store;

const MOUNT_NODE = document.getElementById('root');
const APP = (
  <Provider store={store}>
    <App />
  </Provider>
);
ReactDOM.render(APP, MOUNT_NODE);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
