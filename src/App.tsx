import { useState } from 'react'
import './App.css'
import Logo from './components/Logo'
import RegistrationForm from './components/RegistrationForm'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showRegistration, setShowRegistration] = useState(false)
  const [showLogin, setShowLogin] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Logo />
          <div className="header-buttons">
            <button 
              className="auth-button"
              onClick={() => {
                setShowRegistration(!showRegistration)
                setShowLogin(false)
              }}
            >
              {showRegistration ? 'Закрыть' : 'Регистрация'}
            </button>
            <button 
              className="auth-button"
              onClick={() => {
                setShowLogin(!showLogin)
                setShowRegistration(false)
              }}
            >
              {showLogin ? 'Закрыть' : 'Войти'}
            </button>
            <button 
              className="menu-button"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span className="menu-icon"></span>
            </button>
          </div>
        </div>
      </header>

      <nav className={`navigation ${isMenuOpen ? 'open' : ''}`}>
        <ul>
          <li><a href="#dashboard">Панель управления</a></li>
          <li><a href="#tasks">Задачи</a></li>
          <li><a href="#reports">Отчеты</a></li>
          <li><a href="#settings">Настройки</a></li>
        </ul>
      </nav>

      <main className="main-content">
        {showRegistration ? (
          <RegistrationForm />
        ) : showLogin ? (
          <div className="login-placeholder">
            <h2>Форма входа</h2>
            <p>Здесь будет форма входа</p>
          </div>
        ) : (
          <section className="welcome-section">
            <div className="welcome-text">
              <h2>Добро пожаловать в</h2>
              <Logo />
            </div>
            <p>Войдите или зарегистрируйтесь для начала работы</p>
            <div className="welcome-buttons">
              <button 
                className="welcome-button login"
                onClick={() => setShowLogin(true)}
              >
                Войти
              </button>
              <button 
                className="welcome-button register"
                onClick={() => setShowRegistration(true)}
              >
                Зарегистрироваться
              </button>
            </div>
          </section>
        )}
      </main>
    </div>
  )
}

export default App
