import './App.scss'
import React from 'react'
import ReactDOM from 'react-dom/client'

import Chess from './components/Chess/chess'

ReactDOM.createRoot(document.querySelector('#root')!).render(
  <React.StrictMode>
    <Chess />
  </React.StrictMode>
)

postMessage({ payload: 'removeLoading' }, '*')
