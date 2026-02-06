// src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom' // 👈 Importa esto
import App from './App'
import './index.css' // O tus estilos

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
  {/* 👈 El Router va AQUÍ, abrazando toda la App */}
      <App />
   
  </React.StrictMode>,
)