const User = require('../models/userModel');
const bcrypt = require('bcrypt');

async function getAllUsers(req, res) {
  try {

    const users = await User.find();

    res.status(200).json({ message: 'usuarios recuperados exitosamente', users: users });

  } catch (error) {

    res.status(500).json({ message: 'error cuando se intenta getAllUsers' });
  }

}

async function getUserById(req, res) {
  try {
    const { id } = req.params;

    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    res.status(200).json({ message: 'usuario encontrado', usuario: user });
  } catch (error) {
    res.status(500).json({ message: 'error de servidor' });
  }
}

async function createUser(req, res) {
  try {

    const { name, email, password } = req.body;

    const salt = 10;

    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({ name, email, password: hashedPassword });

    await newUser.save();

    res.status(201).json({ message: 'usuario creado exitosamente', user: email });

  } catch (error) {

    res.status(500).json({ message: 'error cuando se intenta getAllUsers' });
  }

}

async function deleteUser(req, res) {
  try {
    const { id } = req.params;

    const userDeleted = await User.findByIdAndDelete(id);

    if (!userDeleted) {
      return res.status(404).json({ message: 'usuario no encontrado' });
    }

    res.status(200).json({ message: 'usuario eliminado exitosamente' });
  } catch (error) {
    res.status(500).json({ message: 'ERROR de servidor' });
  }
}

async function updateUser(req, res) {
  try {
    const { id } = req.params;

    const updateData = req.body;

    const userUpdated = await User.findByIdAndUpdate(id, updateData, { new: true });

    if (!userUpdated) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }

    res.status(200).json({ message: 'Usuario actualizado exitosamente', usuario: userUpdated });
  } catch (error) {
    res.status(500).json({ message: 'ERROR de servidor' });
  }
}

module.exports = { getAllUsers, getUserById, createUser, updateUser, deleteUser }


