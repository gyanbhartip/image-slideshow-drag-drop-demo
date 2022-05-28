import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/App';
import './index.css';
import { AppProvider } from './utils/context/Context';

ReactDOM.render(
  <AppProvider>
    <App />
  </AppProvider>,
  document.getElementById("root")
);
