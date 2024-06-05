// src/routes/canchas.js
const express = require('express');
const router = express.Router();
const { obtenerCanchasDisponibles, reservarCancha, reservarTodasCanchas } = require('../controllers/canchasController');

router.get('/:sucursal/canchas-disponibles', obtenerCanchasDisponibles);

module.exports = router;
