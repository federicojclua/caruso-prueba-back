const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    nombre: { type: String, required: true },
    apellido: { type: String, required: true },
    dni: { type: String, required: true, unique: true },
    equipo: { type: String },
    direccion: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, minLength: 7},
    isActive: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
    role: { type: String, default: 'USER' },
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
