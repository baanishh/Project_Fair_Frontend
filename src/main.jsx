import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import './bootstrap.min.css'
import { BrowserRouter } from 'react-router-dom'
import ContextShare from './context/ContextShare.jsx'
import ProtectedRoute from './context/ProtectedRoute.jsx'


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ProtectedRoute>
        <ContextShare>
          <BrowserRouter> 
             <App /> 
          </BrowserRouter>
      </ContextShare>
    </ProtectedRoute>
  </StrictMode>,
)
