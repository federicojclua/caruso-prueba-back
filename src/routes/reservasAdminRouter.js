// src/routes/reservasAdminRouter.js

const express = require('express');
const reservasController = require('../controllers/reservasController');
const checkRole = require('../middlewares/checkRole');

const router = express.Router();

// GET /api/reservas/admin: Obtener todas las reservas (solo para administrador)
router.get('/', checkRole('admin'), reservasController.obtenerTodasLasReservas);

// GET /api/reservas/admin/:id: Obtener una reserva por ID (solo para administrador)
router.get('/:id', checkRole('admin'), reservasController.obtenerReservaPorId);

// POST /api/reservas/admin: Crear una nueva reserva (solo para administrador)
router.post('/', checkRole('admin'), reservasController.crearReserva);

// PUT /api/reservas/admin/:id: Actualizar una reserva por ID (solo para administrador)
router.put('/:id', checkRole('admin'), reservasController.actualizarReserva);

// DELETE /api/reservas/admin/:id: Eliminar una reserva por ID (solo para administrador)
router.delete('/:id', checkRole('admin'), reservasController.eliminarReserva);

module.exports = router;
