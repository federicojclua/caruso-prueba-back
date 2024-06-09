// src/routes/canchasRoutes.js

const express = require('express');
const router = express.Router();
const {
    obtenerCanchasDisponibles,
    crearCancha,
    actualizarCancha,
    eliminarCancha
} = require('../controllers/canchasController');

router.get('/:sucursal', obtenerCanchasDisponibles);
router.post('/', crearCancha);
router.put('/:id', actualizarCancha);
router.delete('/:id', eliminarCancha);

module.exports = router;
