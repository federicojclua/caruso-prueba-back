// src/routes/adminRoutes.js

const express = require('express');
const reservaController = require('../controllers/reservaController');
const canchasController = require('../controllers/canchasController');
const checkRole = require('../middlewares/checkRole');
const validateToken = require('../middlewares/validationToken');

const router = express.Router();

// Middleware para validar el token y el rol de administrador
router.use(validateToken, checkRole('admin'));

// Rutas de reservas
router.get('/reservas', reservaController.obtenerReservas);
router.post('/reservas', reservaController.crearReserva);
router.get('/reservas/:id', reservaController.obtenerReservaPorId);
router.put('/reservas/:id', reservaController.actualizarReserva);
router.patch('/reservas/:id', reservaController.confirmarReserva);

// Rutas de canchas
router.get('/canchas/:sucursal', canchasController.obtenerCanchasDisponibles);
router.post('/canchas', canchasController.crearCancha);
router.put('/canchas/:id', canchasController.actualizarCancha);
router.delete('/canchas/:id', canchasController.eliminarCancha);

module.exports = router;
