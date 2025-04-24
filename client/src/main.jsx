import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import './bootstrap.min.css'
import ResponseContext from './contexts/ResponseContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter basename='/'>
      <ResponseContext><App /></ResponseContext>
    </BrowserRouter>
  </StrictMode>,
)
