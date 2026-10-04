import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { CmsProvider } from './context/CmsContext.jsx'
import { CallbackModalProvider } from './context/CallbackModalContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <CmsProvider>
      <CallbackModalProvider>
        <App />
      </CallbackModalProvider>
    </CmsProvider>
  </StrictMode>,
)

