// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './app/App'
import './public/css/style.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import '@fortawesome/fontawesome-free/css/all.css';
import { BrowserRouter } from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary'

// Динамически определяем базовый путь
const basename = import.meta.env.VITE_BASE_URL || '/'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    {/* <BrowserRouter> */}
    <BrowserRouter basename={basename}>
      <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </BrowserRouter>
  </React.StrictMode>
)
