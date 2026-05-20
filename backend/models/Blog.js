const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Blog = sequelize.define('Blog', {
  id: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true },
  title: { type: DataTypes.STRING, allowNull: false },
  content: { type: DataTypes.TEXT, allowNull: false },
  cover_image: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING, defaultValue: 'Mar de Miel' },
  is_published: { type: DataTypes.BOOLEAN, defaultValue: false }
});

module.exports = Blog;