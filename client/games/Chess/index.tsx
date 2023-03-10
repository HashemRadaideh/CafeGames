import React from 'react';
import ReactDOM from 'react-dom/client';

import Chessboard from './App';

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Chessboard />
  </React.StrictMode>
)
