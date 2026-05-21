const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Guide = require('../models/Guide');

const storage = multer.diskStorage({
  destination: function (req, file, cb) { cb(null, 'uploads/'); },
  filename: function (req, file, cb) { cb(null, 'guide-' + Date.now() + path.extname(file.originalname)); }
});
const upload = multer({ storage: storage });

// GET: Obtener todas las guías activas
router.get('/', async (req, res) => {
  try {
    const guides = await Guide.findAll({ order: [['createdAt', 'DESC']] });
    res.json(guides);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener guías" });
  }
});

// POST: Crear una guía
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const { title, description, category, is_active } = req.body;
    const image_url = req.file ? req.file.path.replace(/\\/g, "/") : null;

    const newGuide = await Guide.create({
      title, description, category, image_url,
      is_active: is_active === 'true'
    });
    res.status(201).json(newGuide);
  } catch (error) {
    res.status(500).json({ message: "Error al crear la guía" });
  }
});

// PUT: Actualizar una guía
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, category, is_active } = req.body;
    const guide = await Guide.findByPk(id);
    
    if (!guide) return res.status(404).json({ message: "Guía no encontrada" });

    guide.title = title || guide.title;
    guide.description = description || guide.description;
    guide.category = category || guide.category;
    if (is_active !== undefined) guide.is_active = is_active === 'true';
    if (req.file) guide.image_url = req.file.path.replace(/\\/g, "/");

    await guide.save();
    res.json(guide);
  } catch (error) {
    res.status(500).json({ message: "Error al actualizar" });
  }
});

// DELETE: Eliminar una guía
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await Guide.destroy({ where: { id } });
    res.json({ message: "Eliminado" });
  } catch (error) {
    res.status(500).json({ message: "Error al eliminar" });
  }
});

module.exports = router;