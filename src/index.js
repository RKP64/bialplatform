import React from 'react';
import ReactDOM from 'react-dom/client';

// This is the crucial line that imports all of your Tailwind styles.
import './index.css';

import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
