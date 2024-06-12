const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateJwt } = require('../libs/jwt');
const jwt = require('jsonwebtoken');

const register = async (req, res) => {
    try {
        const { nombre, apellido, dni, equipo, direccion, email, password } = req.body;

        const salt = 10;
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            nombre, 
            apellido,
            dni,
            equipo,
            direccion,
            email,
            password: hashedPassword
        });

        await newUser.save();
        const token = await generateJwt({ id: newUser._id, email: newUser.email });
        res.cookie("token", token); 

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                nombre: newUser.nombre,
                dni: newUser.dni,
                email: newUser.email
            },
            token: token
        });
    } catch (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

const registerAdmin = async (req, res) => {
    try {
        const { nombre, email, password } = req.body;

        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: 'El usuario ya existe' });
        }

        user = new User({
            nombre,
            email,
            password: await bcrypt.hash(password, 10),
            role: 'admin',
        });

        await user.save();

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
            expiresIn: '1d',
        });

        res.status(201).json({ token });
    } catch (error) {
        console.error('Error al registrar el administrador:', error);
        res.status(500).json({ message: 'Error al registrar el administrador', error });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log('Email:', email, 'Password:', password);

        if (!email || !password) {
            console.log('Faltan email o contraseña');
            return res.status(404).json({ message: 'No enviaste el email o password, para el logueo es requerido' });
        }

        const user = await User.findOne({ email });
        console.log('Usuario encontrado:', user);

        if (!user) {
            console.log('Usuario no encontrado');
            return res.status(401).json({ message: 'Usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        console.log('Contraseña coincide:', isMatch);

        if (!isMatch) {
            console.log('Email o contraseña incorrecta');
            return res.status(401).json({ message: 'Email o contraseña incorrecta' });
        }

        const token = await generateJwt({ id: user._id, email: user.email });
        console.log('Token generado:', token);

        res.cookie("token", token);

        res.status(201).json({ 
            message: 'Logueo exitoso', 
            user: {
                nombre: user.nombre,
                email: user.email,
                role: user.role
            },
            token: token
        });
    } catch (error) {
        console.error('Error en login de usuario:', error);
        res.status(500).json({
            message: 'Error en login de usuario'
        });
    }
};

const logout = (req, res) => {
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.redirect('/');
};

module.exports = {
    register,
    registerAdmin,
    login,
    logout,
};