const User = require('../models/userModel');
const bcrypt = require('bcrypt');

// Obtener todos los usuarios
async function getAllUsers(req, res) {
    try {
        const users = await User.find();
        res.status(200).json({ message: 'Usuarios recuperados exitosamente', users });
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener usuarios' });
    }
}

// Obtener usuario por ID
async function getUserById(req, res) {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario encontrado', user });
    } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
    }
}

// Crear usuario
async function createUser(req, res) {
    try {
        const { name, apellido, dni, equipo, direccion, email, password } = req.body;
        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new User({
            name,
            apellido,
            dni,
            equipo,
            direccion,
            email,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(201).json({
            message: 'Usuario creado exitosamente',
            user: {
                id: newUser._id,
                name: newUser.name,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear usuario', error });
    }
}

// Actualizar usuario
async function updateUser(req, res) {
    try {
        const { id } = req.params;
        const updateData = req.body;
        const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true });
        if (!userUpdated) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario actualizado exitosamente', user: userUpdated });
    } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
    }
}

// Eliminar usuario
async function deleteUser(req, res) {
    try {
        const { id } = req.params;
        const userDeleted = await User.findByIdAndDelete(id);
        if (!userDeleted) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        res.status(200).json({ message: 'Usuario eliminado exitosamente' });
    } catch (error) {
        res.status(500).json({ message: 'Error de servidor' });
    }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser };
