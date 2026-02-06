// backend/config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME, 
  process.env.DB_USER, 
  process.env.DB_PASS, 
  {
    host: process.env.DB_HOST,
    dialect: 'postgres',
    port: process.env.DB_PORT || 5432,
    logging: false,
    // 👇 ESTO ES NUEVO Y NECESARIO PARA AWS/NUBE
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false // Esto permite conectar sin descargar el certificado de AWS manual
      }
    },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  }
);

module.exports = sequelize;