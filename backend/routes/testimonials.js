// routes/testimonials.js
const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Testimonial = require('../models/Testimonial');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Asegúrate de que esta carpeta exista en tu backend
  },
  filename: function (req, file, cb) {
    cb(null, 'testimonial-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// [GET] - Obtener todos los testimonios (Para la vista pública y el Admin)
router.get('/', async (req, res) => {
  try {
    const testimonios = await Testimonial.findAll({ 
      order: [['createdAt', 'DESC']] // Los más nuevos primero
    });
    res.json(testimonios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener testimonios" });
  }
});

// [POST] - Crear un nuevo testimonio (Desde la vista pública o el Admin)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { author_name, content, rating } = req.body;
    
    // Si subieron una imagen, guardamos la ruta. Normalize para evitar barras invertidas en Windows.
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const nuevoTestimonio = await Testimonial.create({
      author_name,
      content,
      rating: parseInt(rating) || 5,
      image_url
    });

    res.status(201).json(nuevoTestimonio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el testimonio" });
  }
});

// [DELETE] - Eliminar un testimonio (Desde el Admin)
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Testimonial.destroy({ where: { id } });
    res.json({ message: "Testimonio eliminado exitosamente" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al eliminar el testimonio" });
  }
});

module.exports = router;