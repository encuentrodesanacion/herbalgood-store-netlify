// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const auth = require('../middleware/auth'); // Importamos el guardia

// ==========================================
// 1. RUTAS PARA CLIENTES / USUARIOS NORMALES
// ==========================================

// REGISTRO
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ where: { email } });
    if (user) return res.status(400).json({ msg: 'El usuario ya existe' });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    user = await User.create({ name, email, password: hashedPassword });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// LOGIN CLIENTES
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Credenciales inválidas' });

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' }, (err, token) => {
      if (err) throw err;
      res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error en el servidor');
  }
});

// OBTENER USUARIO ACTUAL (Ruta protegida para "Mi Cuenta")
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id, {
      attributes: { exclude: ['password'] }
    });
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
});

// ==========================================
// 2. RUTA EXCLUSIVA PARA EL ADMINISTRADOR
// ==========================================

router.post('/admin-login', (req, res) => {
  const { username, password } = req.body;

  // Verificamos contra las variables de entorno (.env)
  // Usamos un fallback a strings quemados SOLO por si olvidas ponerlos en el .env
  const validUser = process.env.ADMIN_USERNAME || 'admin';
  const validPass = process.env.ADMIN_PASSWORD || 'admin123';

  if (username === validUser && password === validPass) {
    // Generamos un token especial de administrador válido por 12 horas
    const token = jwt.sign(
      { role: 'admin' }, 
      process.env.JWT_SECRET || 'supersecreto123', 
      { expiresIn: '12h' }
    );
    
    return res.json({ success: true, token });
  }

  // Si las credenciales fallan
  return res.status(401).json({ success: false, message: 'Credenciales de administrador incorrectas' });
});

module.exports = router;