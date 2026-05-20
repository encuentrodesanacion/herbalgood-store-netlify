// backend/models/Product.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Product = sequelize.define('Product', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  price: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  size_category: {
    type: DataTypes.STRING, // Ej: "500g", "1kg", "Packs"
    allowNull: false,
  },
  is_featured: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
  },
  category: { // <-- NUEVO CAMPO
    type: DataTypes.STRING,
    defaultValue: 'Mieles',
  },
  image_url: {
    type: DataTypes.STRING,
  }
}, {
  timestamps: true, // Crea columnas createdAt y updatedAt automáticamente
});

module.exports = Product;