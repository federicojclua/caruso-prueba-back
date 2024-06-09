const Cancha = require('../models/canchasModels'); 

const obtenerCanchasDisponibles = async (req, res) => {
    const { sucursal } = req.params;
    try {
        const canchas = await Cancha.find({ sucursal, disponible: true });
        res.json(canchas);
    } catch (error) {
        res.status(500).json({ message: 'Error al obtener las canchas disponibles' });
    }
};

// Otros controladores para crear, actualizar y eliminar canchas
const crearCancha = async (req, res) => {
    const { nombre, tamanio, sucursal, disponible } = req.body;
    const nuevaCancha = new Cancha({
        nombre,
        tamanio,
        sucursal,
        disponible
    });

    try {
        const canchaGuardada = await nuevaCancha.save();
        res.status(201).json(canchaGuardada);
    } catch (error) {
        res.status(400).json({ message: 'Error al crear la cancha', error });
    }
};

const actualizarCancha = async (req, res) => {
    const { id } = req.params;
    const { nombre, sucursal, disponible } = req.body;

    try {
        const canchaActualizada = await Cancha.findByIdAndUpdate(
            id,
            { nombre, sucursal, disponible },
            { new: true }
        );

        if (!canchaActualizada) {
            return res.status(404).json({ message: 'Cancha no encontrada' });
        }

        res.json(canchaActualizada);
    } catch (error) {
        res.status(400).json({ message: 'Error al actualizar la cancha', error });
    }
};

const eliminarCancha = async (req, res) => {
    const { id } = req.params;

    try {
        const canchaEliminada = await Cancha.findByIdAndDelete(id);

        if (!canchaEliminada) {
            return res.status(404).json({ message: 'Cancha no encontrada' });
        }

        res.json({ message: 'Cancha eliminada correctamente' });
    } catch (error) {
        res.status(400).json({ message: 'Error al eliminar la cancha', error });
    }
};

module.exports = {
    obtenerCanchasDisponibles,
    crearCancha,
    actualizarCancha,
    eliminarCancha
};
