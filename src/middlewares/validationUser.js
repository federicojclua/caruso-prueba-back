const { body, validationResult } = require('express-validator');


const validateUser = [
    body('nombre').trim().notEmpty().withMessage('El nombre es obligatorio'),
    body('dni').trim().isLength({ min: 7, max: 8 }).notEmpty().withMessage('Ingrese su DNI sin puntos'),
    body('email').isEmail().notEmpty().withMessage('Ingrese un correo electrónico válido'),
    body('password').isLength({ min: 7, max: 15 }).notEmpty().withMessage('La contraseña debe tener entre 7 y 15 caracteres'),

    
    (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        next();
    }
];

module.exports = validateUser;

