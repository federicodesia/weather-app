import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import './theme/theme.css';
import './theme/dashed-line.css';
import './theme/loading-bar.css';

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