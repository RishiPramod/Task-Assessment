import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import store from './store.js'
import { Provider } from 'react-redux'
import { Toaster } from 'react-hot-toast'
import { BrowserRouter } from 'react-router-dom'

createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <BrowserRouter>
      <StrictMode>
        <Toaster />
        <App />
      </StrictMode>
    </BrowserRouter>
  </Provider>
)
