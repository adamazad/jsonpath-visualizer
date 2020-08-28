import React from 'react';
import ReactDOM from 'react-dom';
// From Bootstrap
import './styles/reboot.css';
import './index.scss';
// App
import App from './App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);