const { body, validationResult } = require("express-validator");

const validateCancha = [
	body("numero")
		.isInt({ min: 1 })
		.withMessage("El número de cancha debe ser un entero positivo"),
	body("tipoFutbol")
		.isIn([5, 7, 9])
		.withMessage("El tipo de fútbol debe ser 5, 7 o 9"),
	body("sucursal").notEmpty().withMessage("La sucursal es obligatoria"),
	(req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}
		next();
	},
];

module.exports = validateCancha;
