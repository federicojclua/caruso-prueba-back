const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateJwt } = require('../libs/jwt');
const { response } = require('express');

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
        const token = await generateJwt(newUser); // generamos el token con el usuario recien creado
        res.cookie("token", token); 

        // respuesta de datos del usuario para utilizar en el front
        res.json({
            nombre: newUser.nombre,
            dni: newUser.dni,
            email: newUser.email,
        })

        newUser.password = undefined;

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: email });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (!email || !password) {
            return res.status(404).json({ message: 'NO ENVIASTE EL EMAIL o PASSWORD, para el logueo es requerido' });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'usuario no encontrado' });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'email o contraseña incorrecta' });
        }

        const token = generateJwt({ id: user._id, email: user.email });

        res.cookie("token", token); // guardamos el token en las cookies

        // respuesta de datos del usuario para utilizar en el front
        res.json({
            nombre: user.nombre,
            email: user.email,
        })

        res.status(201).json({ message: 'logueo exitoso', user: user, token: token });
    } catch (error) {
        res.status(500).json({ message: 'error en login de usuario' });
    }
};

const logout = (req, res) =>{
    res.cookie('token', "", {
        expires: new Date(0)
    });
    return res.redirect('/') // REDIRECCIONA AL INDEX
};

module.exports = {
    register,
    login,
    logout,
};
