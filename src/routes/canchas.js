// src/routes/canchas.js
const express = require('express');
const router = express.Router();
const { obtenerCanchasDisponibles, reservarCancha, reservarTodasCanchas } = require('../controllers/canchasController');

router.get('/:sucursal/canchas-disponibles', obtenerCanchasDisponibles);
//router.post('/reservar', canchasController.reservarCancha);
//router.post('/reservar-todas', canchaController.reservarTodasCanchas);

module.exports = router;
