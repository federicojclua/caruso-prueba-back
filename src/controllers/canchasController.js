// src/controllers/canchasController.js
const Cancha = require("../models/CanchasModels"); // Corregir la ruta de importación

// Obtener disponibilidad de las canchas
const obtenerCanchasDisponibles = async (req, res) => {
	const { sucursal } = req.params;
	try {
		const canchas = await Cancha.find({ sucursal, disponible: true });
		res.json(canchas);
		
		//  io.emit('actualizacion-disponibilidad', canchas);
	} catch (error) {
		res
			.status(500)
			.json({ message: "Error al obtener las canchas disponibles" });
	}
};


module.exports = {
	obtenerCanchasDisponibles,
};
