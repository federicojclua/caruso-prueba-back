// src/models/ReservasModel.js

const mongoose = require('mongoose');

const reservaSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Usuario', // Referencia al modelo de usuario
    required: true,
  },
  fieldId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Cancha', // Referencia al modelo de cancha
    required: true,
  },
  fecha: {
    type: Date,
    required: true,
  },
  hora: {
    type: String,
    required: true,
  },
  duracion: {
    type: Number,
    required: true,
  },
  estado: {
    type: String,
    enum: ['pendiente', 'confirmada', 'cancelada'],
    default: 'pendiente',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Reserva = mongoose.model('Reserva', reservaSchema);

module.exports = Reserva;
