import React, { useState } from 'react'
import './App.css'
import Logo from './components/Logo'
import RegistrationForm from './components/RegistrationForm'
import LoginForm from './components/LoginForm'
import { useAuth } from './context/AuthContext'

function App() {
  const { user, isAuthenticated, logout } = useAuth()
  const [showRegistration, setShowRegistration] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  const handleLoginSuccess = () => {
    setShowLogin(false)
  }

  return (
    <div className="app">
      <header className="header">
        <Logo />
        <div className="auth-buttons">
          {isAuthenticated ? (
            <>
              <span className="user-info">
                {user?.firstName} {user?.lastName} ({user?.role})
              </span>
              <button onClick={logout} className="auth-button">
                Выйти
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setShowLogin(true)}
                className="auth-button login"
              >
                Войти
              </button>
              <button
                onClick={() => setShowRegistration(true)}
                className="auth-button register"
              >
                Регистрация
              </button>
            </>
          )}
        </div>
      </header>

      <main className="main-content">
        {!isAuthenticated ? (
          <div className="welcome-section">
            <h1>Добро пожаловать в РСП-Т</h1>
            <p>Войдите или зарегистрируйтесь для начала работы</p>
            <div className="welcome-buttons">
              <button
                onClick={() => setShowLogin(true)}
                className="welcome-button login"
              >
                Войти
              </button>
              <button
                onClick={() => setShowRegistration(true)}
                className="welcome-button register"
              >
                Регистрация
              </button>
            </div>
          </div>
        ) : (
          <div className="dashboard">
            {/* Здесь будет контент для авторизованных пользователей */}
            <h2>Добро пожаловать, {user?.firstName}!</h2>
            <p>Ваша роль: {user?.role}</p>
          </div>
        )}
      </main>

      {showRegistration && (
        <div className="modal">
          <div className="modal-content">
            <RegistrationForm onClose={() => setShowRegistration(false)} />
          </div>
        </div>
      )}

      {showLogin && (
        <div className="modal">
          <div className="modal-content">
            <LoginForm
              onClose={() => setShowLogin(false)}
              onSuccess={handleLoginSuccess}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default App
