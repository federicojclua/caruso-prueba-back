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

userRouter.get('/usuarios', getAllUsers);

userRouter.post('/usuarios', validateToken, createUser);

userRouter.get('/usuarios/:id', validateToken, getUserById);

userRouter.patch('/usuarios/:id', updateUser);

userRouter.delete('/usuarios/:id', deleteUser);

module.exports = userRouter;