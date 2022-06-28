import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './styles/index.css';
import './styles/constants.css';
import './styles/dashed-line.css';
import './styles/loading-bar.css';

import './utils/number'
import './utils/array'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);