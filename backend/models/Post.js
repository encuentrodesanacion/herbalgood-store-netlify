// models/Post.js (o donde definas tus modelos de Sequelize)
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Ajusta la ruta a tu conexión

const Post = sequelize.define('Post', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  content: {
    type: DataTypes.TEXT, // Usamos TEXT porque el contenido del blog será largo
    allowNull: false,
  },
  category: {
    type: DataTypes.STRING,
    defaultValue: 'Biodiversidad',
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true,
  }
}, {
  tableName: 'posts',
  timestamps: true, // Esto creará automáticamente 'createdAt' y 'updatedAt'
});

module.exports = Post;