const mongoose = require('mongoose');

const SucursalSchema = new mongoose.Schema({
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  turnos: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Turno'
  }]
});

module.exports = mongoose.model('Sucursal', SucursalSchema);
