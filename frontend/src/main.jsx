import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import FloatingFooter from './footer/FloatingFooter'
import './index.css'
import './cek transaksi/cek_transaksi.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <FloatingFooter />
  </React.StrictMode>
)
