const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Testimonial = require('../models/Testimonial');

// Configuración de Multer para subir imágenes
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); 
  },
  filename: function (req, file, cb) {
    cb(null, 'testimonial-' + Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// [GET] PÚBLICO - Obtener solo los testimonios aprobados por el administrador
router.get('/', async (req, res) => {
  try {
    const testimonios = await Testimonial.findAll({ 
      where: { status: 'approved' }, // 👈 Solo los aprobados van a la web pública
      order: [['createdAt', 'DESC']] 
    });
    res.json(testimonios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener testimonios" });
  }
});

// [GET] PRIVADO ADMIN - Obtener todos los testimonios para moderación
router.get('/admin-list', async (req, res) => {
  try {
    const todosLosTestimonios = await Testimonial.findAll({ 
      order: [['createdAt', 'DESC']] 
    });
    res.json(todosLosTestimonios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al obtener la lista de moderación" });
  }
});

// [POST] - Crear un nuevo testimonio (Nace como 'pending' automáticamente)
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { author_name, content, rating } = req.body;
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const nuevoTestimonio = await Testimonial.create({
      author_name,
      content,
      rating: parseInt(rating) || 5,
      image_url,
      status: 'pending' // 👈 Forzamos que se cree en estado pendiente
    });

    res.status(201).json(nuevoTestimonio);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al crear el testimonio" });
  }
});

// [PUT] - Aprobar un testimonio (Desde el Admin)
router.put('/approve/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const testimonio = await Testimonial.findByPk(id);

    if (!testimonio) {
      return res.status(404).json({ message: "Testimonio no encontrado" });
    }

    testimonio.status = 'approved';
    await testimonio.save();

    res.json({ message: "Testimonio aprobado y publicado con éxito", testimonio });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error al aprobar el testimonio" });
  }
});

// [DELETE] - Eliminar o Rechazar un testimonio (Desde el Admin)
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