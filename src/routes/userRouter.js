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

userRouter.get('/api/usuarios', getAllUsers);

userRouter.post('/api/usuarios', validateToken, createUser);

userRouter.get('/api/usuarios/:id', validateToken, getUserById);

userRouter.patch('/api/usuarios/:id', updateUser);

userRouter.delete('/api/usuarios/:id', deleteUser);

module.exports = userRouter;