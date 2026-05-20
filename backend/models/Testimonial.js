// models/Testimonial.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta esta ruta a tu archivo de conexión

const Testimonial = sequelize.define('Testimonial', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  author_name: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  content: { 
    type: DataTypes.TEXT, 
    allowNull: false 
  },
  rating: { 
    type: DataTypes.INTEGER, 
    defaultValue: 5 
  },
  image_url: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
});

module.exports = Testimonial;