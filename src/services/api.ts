import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Создаем экземпляр axios с базовым URL
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Интерцептор для добавления токена к запросам
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Интерфейсы
export interface IUser {
  id: string;
  username: string;
  email: string;
  role: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
  isActive: boolean;
}

export interface ILoginData {
  email: string;
  password: string;
}

export interface IRegistrationData {
  username: string;
  email: string;
  password: string;
  role: string;
  firstName: string;
  lastName: string;
  position: string;
  department: string;
}

export interface IAuthResponse {
  token: string;
  user: IUser;
  message: string;
}

// API методы
export const authApi = {
  // Регистрация
  async register(data: IRegistrationData): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/auth/register', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Вход
  async login(data: ILoginData): Promise<IAuthResponse> {
    const response = await api.post<IAuthResponse>('/auth/login', data);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
    }
    return response.data;
  },

  // Получение текущего пользователя
  async getCurrentUser(): Promise<IUser> {
    const response = await api.get<{ user: IUser }>('/auth/me');
    return response.data.user;
  },

  // Выход
  logout() {
    localStorage.removeItem('token');
  },
};

export default api; 