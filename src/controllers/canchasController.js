// src/controllers/canchasController.js
const Cancha = require("../models/canchasModels");

// Obtener disponibilidad de las canchas
const obtenerCanchasDisponibles = async (req, res) => {
	const { sucursal } = req.params;
	try {
		const canchas = await Cancha.find({ sucursal, disponible: true });
		res.json(canchas);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener las canchas disponibles" });
	}
};

module.exports = {
	obtenerCanchasDisponibles,
};
