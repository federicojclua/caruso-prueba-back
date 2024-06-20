// src/routes/reservaRoutes.js
const express = require('express');
const reservasController = require('../controllers/reservaController'); // Cambio de 'reservasController' a 'reservaController'
const authMiddleware = require('../middlewares/authMiddleware');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// Proteger todas las rutas con autenticación
router.use(authMiddleware);

// Rutas para reservas (público y admin)
router.get('/', reservasController.obtenerReservas);  
router.post('/', reservasController.crearReserva);  
router.get('/:id', reservasController.obtenerReservaPorId);  
router.put('/:id', reservasController.actualizarReserva);
router.delete('/:id', reservasController.eliminarReserva); 

module.exports = router;
