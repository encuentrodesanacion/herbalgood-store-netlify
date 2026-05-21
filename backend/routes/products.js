// backend/routes/products.js
const express = require('express');
const router = express.Router();
const Product = require('../models/Product');
const multer = require('multer');
const path = require('path');

// ==========================================
// CONFIGURACIÓN DE MULTER
// ==========================================
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // IMPORTANTE: Asegúrate de tener una carpeta llamada 'uploads' en la raíz de tu backend
    cb(null, 'uploads/'); 
  },
  filename: (req, file, cb) => {
    // Guarda el archivo con un timestamp para que no haya nombres duplicados
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// ==========================================
// OBTENER todos los productos
// ==========================================
router.get('/', async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al obtener los productos' });
  }
});

// ==========================================
// CREAR un nuevo producto (Ahora con imagen)
// ==========================================
router.post('/', upload.single('image'), async (req, res) => {
  try {
    const productData = { ...req.body };
    
    // Si viene un archivo adjunto, guardamos su ruta
    if (req.file) {
      // replace(/\\/g, '/') asegura que la ruta funcione bien en la web aunque uses Windows
      productData.image_url = req.file.path.replace(/\\/g, '/');
    }

    const newProduct = await Product.create(productData);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al crear el producto' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id);
    
    if (!product) {
      return res.status(404).json({ msg: 'Producto no encontrado en la base de datos' });
    }
    
    res.json(product);
  } catch (error) {
    console.error("Error al buscar el producto por ID:", error);
    res.status(500).json({ msg: 'Error al obtener el producto' });
  }
});
// ==========================================
// ELIMINAR un producto
// ==========================================
router.delete('/:id', async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ msg: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Error al eliminar' });
  }
});

// ==========================================
// ACTUALIZAR un producto (Ahora con imagen)
// ==========================================
router.put('/:id', upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };
    
    // Si el usuario subió una imagen nueva, actualizamos la ruta
    if (req.file) {
      updateData.image_url = req.file.path.replace(/\\/g, '/');
    }

    // Actualizamos el producto en la BD
    const [updatedRows] = await Product.update(updateData, {
      where: { id: req.params.id }
    });

    // En lugar de usar [1][0] que puede fallar, verificamos si se afectaron filas
    if (updatedRows > 0) {
      const updatedProduct = await Product.findByPk(req.params.id);
      res.json(updatedProduct);
    } else {
      res.status(404).json({ msg: 'Producto no encontrado' });
    }
  } catch (error) {
    console.error("Error en el PUT:", error);
    res.status(500).json({ msg: 'Error al actualizar el producto' });
  }
});

module.exports = router;