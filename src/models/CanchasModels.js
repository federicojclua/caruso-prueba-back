// src/models/CanchasModels.js
const mongoose = require('mongoose');

const CanchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true,
    },
    tamanio: {
        type: String, 
        enum: ['3', '5', '9'], 
        required: true,
    },
    sucursal: {
        type: String,
        required: true,
    }, // capaz que no sea necesario este argumento
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
