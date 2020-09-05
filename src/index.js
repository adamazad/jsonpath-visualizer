import React from 'react';
import ReactDOM from 'react-dom';
import { ThemeProvider } from 'styled-components';
import App from './App';
import Theme from './styles/Theme';
import GlobalStyle from './styles/Global';

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider theme={ Theme }>
      <GlobalStyle/>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);