const express = require('express');
const {
    getAllUsers,
    createUser,
    getUserById,
    updateUser,
    deleteUser
} = require('../controllers/userController');
const validateToken = require('../middlewares/validationToken');

const userRouter = express.Router();

userRouter.get('/api/users', getAllUsers);

userRouter.post('/api/users', validateToken, createUser);

userRouter.get('/api/users/:id', validateToken, getUserById);

userRouter.patch('/api/users/:id', updateUser);

userRouter.delete('/api/users/:id', deleteUser);

// Rutas accesibles solo por administradores
userRouter.post('/api/admin/createUser', validateToken, checkRole('ADMIN'), createUser);
userRouter.delete('/api/admin/users/:id', validateToken, checkRole('ADMIN'), deleteUser);

module.exports = userRouter;

module.exports = userRouter;
