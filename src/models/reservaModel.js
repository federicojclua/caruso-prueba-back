const mongoose = require('mongoose');

const ReservaSchema = new mongoose.Schema({
    usuario: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    cancha: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cancha',
        required: true
    },
    fechaReserva: {
        type: Date,
        required: true
    },
    horaInicio: {
        type: String,
        required: true
    },
    horaFin: {
        type: String,
        required: true
    },
    estado: {
        type: String,
        enum: ['pendiente', 'confirmada', 'cancelada'],
        default: 'pendiente'
    },
    fechaCreacion: {
        type: Date,
        default: Date.now
    }
});

const Reserva = mongoose.model('Reserva', ReservaSchema);

module.exports = Reserva;