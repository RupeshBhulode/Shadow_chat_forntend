import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom'; // ⬅️ change this line
import App from './App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <HashRouter>   {/* ⬅️ change this line */}
    <App />
  </HashRouter>
);
