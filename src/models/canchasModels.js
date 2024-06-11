// src/models/CanchasModels.js
const mongoose = require('mongoose');

const CanchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tamanio: {
        type: String, 
        enum: ['5', '7', '9'], 
        required: true,
    },
    sucursal: {
        type: String,
        required: true,
    }, 
    disponible: {
        type: Boolean,
        default: true,
    },
    reservas: [{
        inicio: { type: Date, required: true },
        fin: { type: Date, required: true }
        }],
});

const Cancha = mongoose.model('Cancha', CanchaSchema);

module.exports = Cancha;
