const { body, validationResult } = require("express-validator");

const validateReserva = [
	body("usuario").notEmpty().withMessage("El usuario es obligatorio"),
	body("canchas")
		.isArray({ min: 1 })
		.withMessage("Debe haber al menos una cancha en la reserva"),
	body("fecha").isISO8601().withMessage("La fecha no es válida"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateReserva;
