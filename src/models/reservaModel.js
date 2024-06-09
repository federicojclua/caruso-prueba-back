const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reservaSchema = new Schema({
    usuario: { type: Schema.Types.ObjectId, ref: 'Usuario', required: true },
    cancha: { type: Schema.Types.ObjectId, ref: 'Cancha', required: true },
    fechaReserva: { type: Date, required: true },
    horaInicio: { type: String, required: true },
    horaFin: { type: String, required: true },
    tipoFutbol: { type: String, enum: ['futbol5', 'futbol7', 'futbol9'], required: true }
});

module.exports = mongoose.model('Reserva', reservaSchema);
