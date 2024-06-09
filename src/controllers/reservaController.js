
const Reserva = require('../models/ReservaModel');
const Cancha = require('../models/CanchasModels');

exports.createReserva = async (req, res) => {
  try {
    const { usuario, canchas, fecha } = req.body;

    // Verificar disponibilidad de canchas
    const canchasDisponibles = await Cancha.find({ 
      _id: { $in: canchas }
    });
    
    if (canchasDisponibles.length !== canchas.length) {
      return res.status(400).json({ error: 'No hay suficientes canchas disponibles' });
    }

    const reservas = await Promise.all(canchasDisponibles.map(async (cancha) => {
      const reserva = new Reserva({
          usuario,
          cancha: cancha._id,
          fecha
      });
      return await reserva.save();
  }));
  
    res.status(201).json(reservas);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getReservaById = async (req, res) => {
  try {
    const reserva = await Reserva.findById(req.params.id).populate('usuario').populate('canchas');
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndUpdate(req.params.id, req.body, { new: true }).populate('usuario').populate('canchas');
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json(reserva);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.deleteReserva = async (req, res) => {
  try {
    const reserva = await Reserva.findByIdAndDelete(req.params.id);
    if (!reserva) {
      return res.status(404).json({ error: 'Reserva no encontrada' });
    }
    res.status(200).json({ message: 'Reserva eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};