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

// Reservar una cancha
const reservarCancha = async (req, res) => {
	const { canchaId, inicio, fin } = req.body;

	try {
		const cancha = await Cancha.findById(canchaId);

		// Verificar si hay problemas con las reservas
		const conflicto = cancha.reservas.some(
			(reserva) =>
				new Date(inicio) < new Date(reserva.fin) &&
				new Date(fin) > new Date(reserva.inicio)
		);

		if (conflicto) {
			return res
				.status(400)
				.json({ error: "La cancha ya está reservada para este período" });
		}

		cancha.reservas.push({ inicio, fin });
		await cancha.save();
		await actualizarDisponibilidad(req.io); // Pasar la instancia de io
		res.json(cancha);
	} catch (error) {
		res.status(500).json({ error: "Error al reservar la cancha" });
	}
};

// Reservar todas las canchas juntas
const reservarTodasCanchas = async (req, res) => {
	const { inicio, fin } = req.body;

	try {
		const canchas = await Cancha.find({});

		// Verificar si todas las canchas están disponibles para el período dado
		const conflicto = canchas.some((cancha) =>
			cancha.reservas.some(
				(reserva) =>
					new Date(inicio) < new Date(reserva.fin) &&
					new Date(fin) > new Date(reserva.inicio)
			)
		);

		if (conflicto) {
			return res
				.status(400)
				.json({
					error: "No todas las canchas están disponibles para este período",
				});
		}

		for (const cancha of canchas) {
			cancha.reservas.push({ inicio, fin });
			await cancha.save();
		}

		await actualizarDisponibilidad(req.io); // Pasar la instancia de io
		res.json(canchas);
	} catch (error) {
		res.status(500).json({ error: "Error al reservar todas las canchas" });
	}
};

module.exports = {
	obtenerCanchasDisponibles,
};
