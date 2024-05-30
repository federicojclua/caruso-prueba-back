const Sucursal = require('../models/Sucursal');

exports.getSucursales = async (req, res) => {
  try {
    const sucursales = await Sucursal.find();
    res.json(sucursales);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al obtener las sucursales."
    });
  }
};

exports.createSucursal = async (req, res) => {
  const sucursal = new Sucursal({
    nombre: req.body.nombre,
    direccion: req.body.direccion
  });

  try {
    const nuevaSucursal = await sucursal.save();
    res.status(201).json(nuevaSucursal);
  } catch (err) {
    res.status(500).send({
      message: err.message || "Ocurrió un error al crear la sucursal."
    });
  }
};
