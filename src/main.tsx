import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
import './index.css'
import App from './App.tsx'

// Регистрация сервис-воркера
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/rsp-t-app/sw.js')
      .then(registration => {
        console.log('ServiceWorker зарегистрирован:', registration);
      })
      .catch(error => {
        console.error('Ошибка при регистрации ServiceWorker:', error);
      });
  });
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter basename="/rsp-t-app">
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
