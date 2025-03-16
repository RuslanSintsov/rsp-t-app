import { useState } from 'react'
import './App.css'
import Logo from './components/Logo'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="app">
      <header className="header">
        <div className="header-content">
          <Logo />
          <button 
            className="menu-button"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            <span className="menu-icon"></span>
          </button>
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
        <section className="welcome-section">
          <div className="welcome-text">
            <h2>Добро пожаловать в</h2>
            <Logo />
          </div>
          <p>Выберите раздел для начала работы</p>
        </section>
      </main>
    </div>
  )
}

export default App
