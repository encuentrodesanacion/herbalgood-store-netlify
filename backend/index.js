// backend/index.js
const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();

// Middlewares
app.use(express.json()); // Entender JSON
app.use(cors()); // Permitir peticiones desde React

// Definir Rutas
app.use('/api/auth', require('./routes/auth'));

const PORT = process.env.PORT || 5000;

// Sincronizar BD y Arrancar
sequelize.sync({ force: false })
  .then(() => {
    console.log('📦 Base de datos PostgreSQL Sincronizada');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.log('Error BD:', err));