// backend/index.js
const express = require('express');
const testimonialRoutes = require('./routes/testimonials');
const cors = require('cors');
const guidesRoutes = require('./routes/guides');
const sequelize = require('./config/database');
require('dotenv').config();

const app = express();
const Post = require('./models/Post');

// Middlewares
app.use(express.json()); // Entender JSON
app.use(cors()); // Permitir peticiones desde React


// Definir Rutas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/products', require('./routes/products'));
app.use('/uploads', express.static('uploads'));
app.use('/api/testimonials', testimonialRoutes);
app.use('/api/guides', guidesRoutes);

const PORT = process.env.PORT || 5000;

app.get('/api/posts', async (req, res) => {
  try {
    const posts = await Post.findAll({
      order: [['createdAt', 'DESC']] // Los más nuevos primero
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los artículos' });
  }
});

// 2. CREAR un nuevo artículo (POST)
app.post('/api/posts', async (req, res) => {
  try {
    const newPost = await Post.create(req.body);
    res.status(201).json(newPost);
  } catch (error) {
    res.status(500).json({ error: 'Error al crear el artículo' });
  }
});

// 3. ACTUALIZAR un artículo existente (PUT)
app.put('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const [updated] = await Post.update(req.body, {
      where: { id: id }
    });
    if (updated) {
      const updatedPost = await Post.findByPk(id);
      res.json(updatedPost);
    } else {
      res.status(404).json({ error: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar el artículo' });
  }
});

// 4. ELIMINAR un artículo (DELETE)
app.delete('/api/posts/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Post.destroy({
      where: { id: id }
    });
    if (deleted) {
      res.status(204).send(); // 204 significa "No Content" (éxito al eliminar)
    } else {
      res.status(404).json({ error: 'Artículo no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar el artículo' });
  }
});
// Sincronizar BD y Arrancar
sequelize.sync({ force: false })
  .then(() => {
    console.log('📦 Base de datos PostgreSQL Sincronizada');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
  })
  .catch(err => console.log('Error BD:', err));

  