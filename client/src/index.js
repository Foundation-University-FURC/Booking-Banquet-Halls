import React from 'react';
import ReactDOM from 'react-dom';
import './components/pages/index.css';
import App from './App';
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.bundle";
// import "../node_modules/bootstrap/dist/js/popper.min.js";
import "bootstrap/dist/css/bootstrap.css";
import "../node_modules/@popperjs/core/dist/umd/popper.min.js.flow"
// import 'bootstrap/dist/js/popper.min.js';
// import 'jquery/dist/jquery.js';
// import 'popper.js/dist/umd/popper.js';
// import 'bootstrap/dist/js/bootstrap.js';
import reportWebVitals from './reportWebVitals';
import {BrowserRouter} from 'react-router-dom';
import {Provider} from 'react-redux'
import store from './store'
import SimpleReactLightbox from 'simple-react-lightbox';
import Bar from 'react-chartjs-2';


ReactDOM.render(
  <Provider store = {store}>
  <React.StrictMode>
    <BrowserRouter>
  <SimpleReactLightbox>
    <App />
    </SimpleReactLightbox>
    </BrowserRouter>
  </React.StrictMode>
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
