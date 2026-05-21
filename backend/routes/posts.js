// routes/posts.js

const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Post = require('../models/Post'); // Asegúrate de que apunte a tu modelo correcto

// Configuración de Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, 'post-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// [GET] - Obtener todos los artículos (Para la vista pública y el Admin)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.findAll({ 
      order: [['createdAt', 'DESC']] // Los más nuevos primero
    });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener las publicaciones" });
  }
});

// [GET] - Obtener un artículo por su ID
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.findByPk(id);
    if (!post) return res.status(404).json({ message: "Post no encontrado" });
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la publicación" });
  }
});

// [POST] - Crear un nuevo artículo / guía
router.post('/', upload.single('image'), async (req, res) => {
  try {
    // Extraemos todos los campos, incluyendo is_featured
    const { title, content, category, excerpt, is_featured } = req.body;
    
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const nuevoPost = await Post.create({
      title,
      content,
      category,
      excerpt,
      // Convertimos el texto del FormData a un verdadero booleano
      is_featured: is_featured === 'true', 
      image_url
    });

    res.status(201).json(nuevoPost);
  } catch (error) {
    console.error("Error al crear el artículo:", error);
    res.status(500).json({ message: "Error al crear el artículo" });
  }
});


// [PUT] - Editar/Actualizar un artículo existente
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    // Extraemos todos los campos
    const { title, content, category, excerpt, is_featured } = req.body; 
    
    // 1. Buscamos el artículo en la base de datos
    const post = await Post.findByPk(id); 
    
    if (!post) {
      return res.status(404).json({ message: "Artículo no encontrado" });
    }

    // 2. Actualizamos los textos y atributos
    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    if (excerpt !== undefined) post.excerpt = excerpt;
    
    // Si nos enviaron el dato de is_featured, lo actualizamos como booleano
    if (is_featured !== undefined) {
      post.is_featured = is_featured === 'true'; 
    }

    // 3. Si el administrador subió una NUEVA foto, la reemplazamos
    if (req.file) {
      post.image_url = req.file.path.replace(/\\/g, "/"); 
    }

    // 4. Guardamos los cambios en la base de datos
    await post.save();

    res.json(post);
  } catch (error) {
    console.error("Error al actualizar el artículo:", error);
    res.status(500).json({ message: "Error interno del servidor al actualizar" });
  }
});

// [DELETE] - Eliminar un artículo
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Post.destroy({ where: { id } });
    res.json({ message: "Post eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el post" });
  }
});

module.exports = router;