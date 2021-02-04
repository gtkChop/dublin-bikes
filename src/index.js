import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import BikesApp from './BikesApp';
import reportWebVitals from './reportWebVitals';

ReactDOM.render(
  <React.StrictMode>
    <BikesApp />
  </React.StrictMode>,
  document.getElementById('bikes')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
