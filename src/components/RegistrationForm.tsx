import React, { useState } from 'react';
import { authApi } from '../services/api';
import './RegistrationForm.css';

interface RegistrationFormProps {
  onClose: () => void;
  onError: (message: string) => void;
}

interface RegistrationFormData {
  email: string;
  password: string;
  confirmPassword: string;
  firstName: string;
  lastName: string;
  phone: string;
  position: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  confirmPassword?: string;
  firstName?: string;
  lastName?: string;
  phone?: string;
  position?: string;
}

const RegistrationForm: React.FC<RegistrationFormProps> = ({ onClose, onError }) => {
  const [formData, setFormData] = useState<RegistrationFormData>({
    email: '',
    password: '',
    confirmPassword: '',
    firstName: '',
    lastName: '',
    phone: '',
    position: ''
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Валидация email
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Валидация пароля
  const validatePassword = (password: string): boolean => {
    // Минимум 8 символов, минимум 1 буква, 1 цифра и 1 спецсимвол
    const passwordRegex = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/;
    return passwordRegex.test(password);
  };

  // Валидация телефона
  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+?[1-9][0-9]{10,11}$/;
    return phoneRegex.test(phone);
  };

  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    if (!validateEmail(formData.email)) {
      newErrors.email = 'Введите корректный email адрес';
      isValid = false;
    }

    if (!validatePassword(formData.password)) {
      newErrors.password = 'Пароль должен содержать минимум 8 символов, 1 букву, 1 цифру и 1 спецсимвол';
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Пароли не совпадают';
      isValid = false;
    }

    if (formData.firstName.length < 2) {
      newErrors.firstName = 'Имя должно содержать минимум 2 символа';
      isValid = false;
    }

    if (formData.lastName.length < 2) {
      newErrors.lastName = 'Фамилия должна содержать минимум 2 символа';
      isValid = false;
    }

    if (!validatePhone(formData.phone)) {
      newErrors.phone = 'Введите корректный номер телефона';
      isValid = false;
    }

    if (formData.position.length < 2) {
      newErrors.position = 'Укажите должность';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Очищаем ошибку поля при изменении
    if (errors[name as keyof ValidationErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const { confirmPassword, ...registrationData } = formData;
      await authApi.register({
        ...registrationData,
        username: formData.email,
        role: 'user',
        department: 'Не указан'
      });
      onClose();
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Ошибка при регистрации';
      onError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="registration-form-container">
      <form className="registration-form" onSubmit={handleSubmit}>
        <h2>Регистрация</h2>
        
        <div className="form-group">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className={errors.email ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {errors.email && <span className="error-message">{errors.email}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Пароль:</label>
          <div className="password-input-container">
            <input
              type={showPassword ? 'text' : 'password'}
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={errors.password ? 'error' : ''}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowPassword(!showPassword)}
              disabled={isLoading}
            >
              {showPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.password && <span className="error-message">{errors.password}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="confirmPassword">Подтверждение пароля:</label>
          <div className="password-input-container">
            <input
              type={showConfirmPassword ? 'text' : 'password'}
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={errors.confirmPassword ? 'error' : ''}
              disabled={isLoading}
              required
            />
            <button
              type="button"
              className="toggle-password"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              disabled={isLoading}
            >
              {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
            </button>
          </div>
          {errors.confirmPassword && <span className="error-message">{errors.confirmPassword}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="firstName">Имя:</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={errors.firstName ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {errors.firstName && <span className="error-message">{errors.firstName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="lastName">Фамилия:</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={errors.lastName ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {errors.lastName && <span className="error-message">{errors.lastName}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Телефон:</label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className={errors.phone ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {errors.phone && <span className="error-message">{errors.phone}</span>}
        </div>

        <div className="form-group">
          <label htmlFor="position">Должность:</label>
          <input
            type="text"
            id="position"
            name="position"
            value={formData.position}
            onChange={handleChange}
            className={errors.position ? 'error' : ''}
            disabled={isLoading}
            required
          />
          {errors.position && <span className="error-message">{errors.position}</span>}
        </div>

        <div className="form-actions">
          <button 
            type="submit" 
            className="submit-button"
            disabled={isLoading}
          >
            {isLoading ? 'Регистрация...' : 'Зарегистрироваться'}
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

export default RegistrationForm; 