// Crear una nueva reserva
async function createReserva(req, res) {
	try {
		const { usuario, cancha, fechaReserva, horaInicio, horaFin, tipoFutbol } =
			req.body;
		const newReserva = new Reserva({
			usuario,
			cancha,
			fechaReserva: new Date(fechaReserva),
			horaInicio,
			horaFin,
			tipoFutbol,
		});
		await newReserva.save();
		res.status(201).json({
			message: "Reserva creada exitosamente",
			reserva: newReserva,
		});
	} catch (error) {
		res.status(400).json({ message: "Error al crear la reserva", error });
	}
}
// Obtener todas las reservas
async function getReservas(req, res) {
	try {
		const reservas = await Reserva.find()
			.populate("usuario")
			.populate("cancha");
		res.status(200).json(reservas);
	} catch (error) {
		res.status(500).json({ message: "Error al obtener las reservas", error });
	}
}
module.exports = { createReserva, getReservas };
