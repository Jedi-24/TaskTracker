import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';  //CONTAINS ROOT APP COMPONENT.
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  //INSERTING APP.JS HERE.
  <React.StrictMode>
    <App />   
  </React.StrictMode>,
  document.getElementById('root') //SELECTING ROOT DIV IN INDEX.HTML
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
