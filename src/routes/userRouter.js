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

module.exports = userRouter;