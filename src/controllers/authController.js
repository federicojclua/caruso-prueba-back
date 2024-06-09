const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const { generateJwt } = require('../libs/jwt');
const { response } = require('express');
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
        const token = generateJwt({ id: newUser._id, email: newUser.email });
        res.cookie("token", token); 

        res.status(201).json({
            message: 'Usuario registrado exitosamente',
            user: {
                nombre: newUser.nombre,
                dni: newUser.dni,
                email: newUser.email
            }
        });
    } catch (error) {
        res.status(500).json({ message: 'Error al crear el usuario' });
    }
};

// Registro de un usuario administrador
const registerAdmin = async (req, res) => {
    try {
      const { nombre, email, password } = req.body;
  
      // Verificar si el usuario ya existe
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
  
      // Generar un token
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

        res.cookie("token", token); // token en cookies

        res.status(201).json({ 
            message: 'logueo exitoso', 
            user:{
            nombre: user.nombre,
            email: user.email
        },
        token: token
    });
    } catch (error) {
        res.status(500).json({
            message: 'error en login de usuario'
        });
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
    registerAdmin,
    login,
    logout,
};
