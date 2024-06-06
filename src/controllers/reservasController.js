// src/controllers/reservasController.js

const Reserva = require('../models/ReservasModel'); // Importar modelo de reservas

const obtenerTodasLasReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find();
    res.json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas' });
  }
};

const obtenerReservaPorId = async (req, res) => {
  const { id } = req.params;
  try {
    const reserva = await Reserva.findById(id);
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(reserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reserva' });
  }
};

const crearReserva = async (req, res) => {
  // Implementar la lógica para crear una nueva reserva
  // ...
};

const actualizarReserva = async (req, res) => {
  const { id } = req.params;
  // Implementar la lógica para actualizar una reserva existente
  // ...
};

const eliminarReserva = async (req, res) => {
  const { id } = req.params;
  // Implementar la lógica para eliminar una reserva
  // ...
};

module.exports = {
  obtenerTodasLasReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
};
