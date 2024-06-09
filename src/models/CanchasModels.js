// src/models/canchasModel.js

const mongoose = require('mongoose');

const CanchaSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    sucursal: {
        type: String,
        required: true
    },
    disponible: {
        type: Boolean,
        default: true
    }
});

const Cancha = mongoose.model('Cancha', CanchaSchema);

module.exports = Cancha;
