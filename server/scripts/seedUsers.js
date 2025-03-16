require('dotenv').config();
const mongoose = require('mongoose');
const { User, ROLES } = require('../models/User');

const users = [
  {
    username: 'sintsovro',
    email: 'sintsovro@rsp-m.ru',
    password: 'RSP@2024ce', // Пароль для главного инженера
    role: ROLES.CHIEF_ENGINEER,
    firstName: 'Руслан',
    lastName: 'Синцов',
    position: 'Главный инженер',
    department: 'Инженерный отдел'
  },
  {
    username: 'velikni',
    email: 'velikni@rsp-m.ru',
    password: 'RSP@2024dir', // Пароль для начальника
    role: ROLES.DIRECTOR_GENERAL,
    firstName: 'Николай',
    lastName: 'Велик',
    position: 'Генеральный директор',
    department: 'Руководство'
  },
  {
    username: 'izmailovar',
    email: 'izmailovar@rsp-m.ru',
    password: 'RSP@2024td', // Пароль для технического директора
    role: ROLES.TECHNICAL_DIRECTOR,
    firstName: 'Александр',
    lastName: 'Измайлов',
    position: 'Технический директор',
    department: 'Технический отдел'
  },
  {
    username: 'mironovnp',
    email: 'mironovnp@rsp-m.ru',
    password: 'RSP@2024tech', // Пароль для технолога
    role: ROLES.TECHNOLOGIST,
    firstName: 'Николай',
    lastName: 'Миронов',
    position: 'Технолог',
    department: 'Технологический отдел'
  }
];

async function seedUsers() {
  try {
    // Подключение к MongoDB
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/rspt');
    console.log('Connected to MongoDB');

    // Удаление существующих пользователей
    await User.deleteMany({});
    console.log('Existing users deleted');

    // Создание новых пользователей
    for (const userData of users) {
      const user = new User(userData);
      await user.save();
      console.log(`User ${userData.email} created successfully`);
    }

    console.log('\nПароли для пользователей:');
    users.forEach(user => {
      console.log(`${user.firstName} ${user.lastName} (${user.email}): ${user.password}`);
    });

    console.log('\nВсе пользователи успешно добавлены в базу данных');
  } catch (error) {
    console.error('Error seeding users:', error);
  } finally {
    await mongoose.connection.close();
  }
}

seedUsers(); 