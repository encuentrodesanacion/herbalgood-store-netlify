// backend/models/User.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true
    }
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  // --- NUEVOS CAMPOS ---
  role: {
    type: DataTypes.STRING,
    defaultValue: 'customer', // 'customer' para clientes, 'admin' para ti
    allowNull: false
  }
});

module.exports = User;