// src/routes/authRouter.js
const express = require('express');
const { register, login, logout, registerAdmin } = require('../controllers/authController');

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', logout);

// Ruta para registrar un administrador
router.post('/register-admin', registerAdmin);

module.exports = router;
