// src/routes/reservaRoutes.js
const express = require('express');
const reservasController = require('../controllers/reservaController'); // Cambio de 'reservasController' a 'reservaController'
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Proteger todas las rutas con autenticación
router.use(authMiddleware);

// Rutas para reservas (público y admin)
router.get('/', reservasController.obtenerReservas);  // Asegúrate de que esta función exista en tu controlador
router.post('/', reservasController.crearReserva);  // Verifica esta función también
router.get('/:id', reservasController.obtenerReservaPorId);  // Y esta
router.put('/:id', reservasController.actualizarReserva);  // Y esta
router.delete('/:id', reservasController.eliminarReserva);  // Y esta

module.exports = router;
