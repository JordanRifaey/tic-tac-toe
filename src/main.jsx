import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import ReactDOM from 'react-dom/client'
import TicTacToe from './TicTacToe.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <ErrorBoundary fallback={<div>An error has occurred</div>}>
          <TicTacToe />
      </ErrorBoundary>
  </React.StrictMode>,
)
