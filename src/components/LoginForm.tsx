import React, { useState } from 'react';
import { authApi, ILoginData } from '../services/api';
import './LoginForm.css';

interface LoginFormProps {
  onClose: () => void;
  onSuccess: () => void;
  onError: (message: string) => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose, onSuccess, onError }) => {
  const [formData, setFormData] = useState<ILoginData>({
    email: '',
    password: ''
  });

  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await authApi.login(formData);
      onSuccess();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при входе в систему';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-form">
      <h2>Вход в систему</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-group">
          <input
            type="password"
            name="password"
            placeholder="Пароль"
            value={formData.password}
            onChange={handleChange}
            disabled={isLoading}
            required
          />
        </div>
        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Вход...' : 'Войти'}
          </button>
          <button 
            type="button" 
            onClick={onClose} 
            className="cancel-button"
            disabled={isLoading}
          >
            Отмена
          </button>
        </div>
      </form>
    </div>
  );
};

export default LoginForm; 