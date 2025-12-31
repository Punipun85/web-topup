import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FloatingFooter from './footer/FloatingFooter'
import './index.css'
import './cek transaksi/cek_transaksi.css'
import { BrowserRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
   <BrowserRouter>
    <App />
  </BrowserRouter>
    <FloatingFooter />
  </React.StrictMode>
)
