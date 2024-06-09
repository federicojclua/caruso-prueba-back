// src/controllers/reservaController.js
const Reserva = require('../models/reservaModel');

const obtenerReservas = async (req, res) => {
  try {
    const reservas = await Reserva.find().populate('userId fieldId');
    res.status(200).json(reservas);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las reservas', error });
  }
};

const obtenerReservaPorId = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('userId fieldId');
    if (!reserva) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la reserva', error });
  }
};

const crearReserva = async (req, res) => {
  try {
    const nuevaReserva = new Reserva(req.body);
    const reservaGuardada = await nuevaReserva.save();
    res.status(201).json(reservaGuardada);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la reserva', error });
  }
};

const actualizarReserva = async (req, res) => {
  try {
    const reservaActualizada = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!reservaActualizada) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json(reservaActualizada);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la reserva', error });
  }
};

const eliminarReserva = async (req, res) => {
  try {
    const reservaEliminada = await Reserva.findByIdAndDelete(req.params.id);
    if (!reservaEliminada) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada correctamente' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar la reserva', error });
  }
};

module.exports = {
  obtenerReservas,
  obtenerReservaPorId,
  crearReserva,
  actualizarReserva,
  eliminarReserva,
};
